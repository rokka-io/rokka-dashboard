import PropTypes from 'prop-types'
import React, { Fragment, PureComponent, createRef } from 'react'
import ReactCrop from 'react-image-crop'
import cx from 'classnames'
import { authRequired } from '../utils/auth'
import rokka, { getRenderUrl } from '../rokka'
import { deleteImage, setAlert } from '../state'
import { FOCUS_POINT, FOCUS_AREA } from './imagedetail/constants'
import Header from './imagedetail/Header'
import Actions from './imagedetail/Actions'
import UserMetadata from './imagedetail/UserMetadata'
import FocusPointSvg from './imagedetail/FocusPointSvg'
import {
  calculateScale,
  calculateClickPosition,
  scalePosition,
  calculateRenderedPosition,
  pixelToPercent
} from './imagedetail/cropping'
import BaseLayout from './layouts/BaseLayout'
import Spinner from './Spinner'
import Modal from './Modal'

const EMPTY_FOCUS_AREA = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
}

const DEFAULT_STATE = {
  confirmDeleteImage: false,
  activeFocusMenu: false,
  activeFocusForm: false,
  activeFocus: null,
  focusArea: EMPTY_FOCUS_AREA,
  hasFocusArea: false,
  subjectArea: {
    menuActive: false,
    type: null,
    coords: EMPTY_FOCUS_AREA,
    coordsChanged: false
  },
  metaDataChanged: false,
  image: null,
  imageSize: {
    width: 0,
    height: 0
  },
  addMetadata: {
    name: '',
    type: 'str',
    value: ''
  }
}

function getSubjectArea(image) {
  const { dynamic_metadata: dynamicMetadata = null } = image
  if (!dynamicMetadata) {
    return null
  }
  if (dynamicMetadata.subject_area) {
    return dynamicMetadata.subject_area
  }
  // ROKKA-112 will remove that, for now we still need it.
  if (dynamicMetadata.SubjectArea) {
    return dynamicMetadata.SubjectArea
  }
  if (dynamicMetadata.elements && dynamicMetadata.elements.SubjectArea) {
    return dynamicMetadata.elements.SubjectArea
  }
  return null
}

function transformImage(organization, image) {
  const format = image.format === 'jpg' ? 'jpg' : 'png'
  image.url = getRenderUrl(organization, image.hash, format, 'dynamic/noop')

  const { user_metadata: metadata = {} } = image

  image.user_metadata = Object.keys(metadata).map(key => {
    let [rkaType, name] = key.split(':')
    if (!name) {
      name = rkaType
      rkaType = 'str'
    }
    return {
      key,
      name,
      type: rkaType,
      value: metadata[key]
    }
  })

  return image
}

class ImageDetail extends PureComponent {
  constructor(props) {
    super(props)

    this.state = DEFAULT_STATE

    // ticking is used for resize event debouncing, to only have one resize event at a time causing to update the state
    // from: https://www.html5rocks.com/en/tutorials/speed/animations/
    this.ticking = false

    this.toggleFocusForm = this.toggleFocusForm.bind(this)
    this.toggleFocusMenu = this.toggleFocusMenu.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onAddMetadata = this.onAddMetadata.bind(this)
    this.onChangeMetadata = this.onChangeMetadata.bind(this)
    this.onRemoveMetadata = this.onRemoveMetadata.bind(this)
    this.onCropComplete = this.onCropComplete.bind(this)
    this.onCropChange = this.onCropChange.bind(this)
    this.onImageCropChange = this.onImageCropChange.bind(this)
    this.onImageClick = this.onImageClick.bind(this)
    this.requestOnResizeTick = this.requestOnResizeTick.bind(this)
    this.onResize = this.onResize.bind(this)
    this.onLockImage = this.onLockImage.bind(this)

    this.focusPointRef = createRef()
    this.imageRef = createRef()
  }

  componentDidMount() {
    this.getImage(this.props.router.match.params.hash)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.router.match.params.hash !== this.props.router.match.params.hash) {
      this.getImage(nextProps.router.match.params.hash)
    }
  }

  getImage(hash) {
    const {
      auth: { organization }
    } = this.props

    rokka()
      .sourceimages.get(organization, hash)
      .then(({ body: image }) => {
        image = transformImage(organization, image)
        const updateState = { image }
        let subjectArea = getSubjectArea(image)

        if (subjectArea) {
          // Temporary fix for ROKKA-148 (x/y set to 0 will result in the API not having this property in the response)
          // should be fixed in the API. In the meantime fix it for the dashboard at least.
          subjectArea = {
            width: subjectArea.width,
            height: subjectArea.height,
            x: subjectArea.x || 0,
            y: subjectArea.y || 0
          }

          const subjectAreaType =
            subjectArea.width === 1 && subjectArea.height === 1 ? FOCUS_POINT : FOCUS_AREA
          updateState.subjectArea = {
            coords: subjectArea,
            coordsChanged: false,
            type: subjectAreaType,
            menuActive: true
          }

          if (subjectAreaType === FOCUS_POINT) {
            this.addResizeListener()
          }
        }

        this.setState(updateState)
      })
      .catch(e => {
        if (e.error) {
          setAlert('error', e.error.error.message, 5000)
        } else {
          setAlert('error', 'An unknown error happened', 5000)
        }
        console.error(e)
      })
  }

  componentWillUnmount() {
    this.removeResizeListener()
  }

  removeResizeListener() {
    window.removeEventListener('resize', this.requestOnResizeTick)
  }

  addResizeListener() {
    window.addEventListener('resize', this.requestOnResizeTick)
  }

  onResize() {
    this.ticking = false
    this.setImgRefSize()
  }

  requestOnResizeTick() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.onResize)
    }
    this.ticking = true
  }

  setImgRefSize() {
    const img = this.imageRef.current
    this.setState({
      imageSize: {
        width: img.width,
        height: img.height
      }
    })
  }

  async onSave(e) {
    e.preventDefault()

    const {
      router: { match },
      auth: { organization }
    } = this.props
    const {
      params: { hash }
    } = match

    const {
      image: { user_metadata: metadata },
      subjectArea
    } = this.state
    const imageHasSubjectArea = getSubjectArea(this.state.image) !== null
    const userMetadata = {}

    metadata.forEach(data => {
      let { value } = data
      if (data.type === 'array' && typeof value === 'string') {
        value = value.split(',')
      }
      userMetadata[`${data.type}:${data.name}`] = value
    })

    const alertType = 'success'
    const alertMessages = []
    console.log(this.state.metaDataChanged)
    if (this.state.metaDataChanged) {
      await rokka()
        .sourceimages.meta.replace(organization, hash, userMetadata)
        .catch(e => {
          console.log(e)
          setAlert('error', e.error.error.message, 5000)
        })

      alertMessages.push('user metadata updated')
    }
    if (!subjectArea.type && subjectArea.coordsChanged && imageHasSubjectArea) {
      await rokka()
        .sourceimages.removeSubjectArea(organization, hash)
        .then(({ headers }) => {
          const newImageHash = headers.location.replace(`/sourceimages/${organization}/`, '')

          this.setState(DEFAULT_STATE)

          this.props.router.history.push(`/images/${newImageHash}`)
          alertMessages.push('subject area has been removed')
        })
        .catch(e => {
          console.log(e)
          setAlert('error', e.error.error.message, 5000)
        })
    } else if (subjectArea.type && subjectArea.coordsChanged) {
      await rokka()
        .sourceimages.setSubjectArea(organization, hash, subjectArea.coords)
        .then(resp => {
          if (resp.response && resp.response.headers && resp.response.headers.get('location')) {
            const newImageHash = resp.response.headers
              .get('location')
              .replace(`/sourceimages/${organization}/`, '')

            this.setState(DEFAULT_STATE)
            console.log(newImageHash)
            this.props.router.history.push(`/images/${newImageHash}`)
          }
          alertMessages.push('subject area updated')
        })
        .catch(e => {
          console.log(e)
          setAlert('error', e.error.error.message, 5000)
        })
    }

    setAlert(alertType, alertMessages, 2000)
  }

  onAddMetadata(e) {
    e.preventDefault()

    const { image, addMetadata } = this.state
    const { user_metadata: metadata } = image

    this.setState({
      addMetadata: DEFAULT_STATE.addMetadata,
      image: Object.assign({}, image, {
        user_metadata: [
          ...metadata,
          {
            key: `${addMetadata.type}:${addMetadata.name}`,
            name: addMetadata.name,
            type: addMetadata.type,
            value: addMetadata.value
          }
        ]
      }),
      metaDataChanged: true
    })
  }

  onChangeMetadata(isNew, index, update) {
    // new metadata will be added only when clicking the button. The handler is attached regardless.
    if (isNew) {
      this.setState({
        addMetadata: Object.assign({}, this.state.addMetadata, update)
      })
      return
    }

    const { image } = this.state
    const { user_metadata: metadata } = image

    this.setState({
      image: Object.assign({}, image, {
        user_metadata: [
          ...metadata.slice(0, index),
          Object.assign({}, metadata[index], update),
          ...metadata.slice(index + 1)
        ]
      }),
      metaDataChanged: true
    })
  }

  onRemoveMetadata(e, removeIndex) {
    e.preventDefault()

    const { image } = this.state
    const { user_metadata: metadata } = image

    this.setState({
      image: Object.assign({}, image, {
        user_metadata: metadata.filter((data, index) => index !== removeIndex)
      }),
      metaDataChanged: true
    })
  }

  onCropComplete(crop, pixelCrop) {
    this.setState({
      subjectArea: Object.assign({}, this.state.subjectArea, {
        coords: {
          x: Math.round(pixelCrop.x),
          y: Math.round(pixelCrop.y),
          width: Math.round(pixelCrop.width),
          height: Math.round(pixelCrop.height)
        },
        coordsChanged: true
      })
    })
  }

  onImageCropChange(crop, pixelCrop) {
    this.setState({
      subjectArea: Object.assign({}, this.state.subjectArea, {
        coords: {
          x: Math.round(pixelCrop.x),
          y: Math.round(pixelCrop.y),
          width: Math.round(pixelCrop.width),
          height: Math.round(pixelCrop.height)
        }
      })
    })
  }

  getPercentCrop(pixelCrop) {
    if (!this.imageRef.current) {
      return EMPTY_FOCUS_AREA
    }
    const { naturalWidth, naturalHeight } = this.imageRef.current
    return pixelToPercent(pixelCrop, naturalWidth, naturalHeight)
  }

  onCropChange(e) {
    const { name, value } = e.currentTarget
    const { coords } = this.state.subjectArea

    this.setState({
      subjectArea: Object.assign({}, this.state.subjectArea, {
        coords: Object.assign({}, coords, {
          [name]: value
        }),
        coordsChanged: true
      })
    })
  }

  /**
   *
   * @param {MouseEvent} e
   */
  onImageClick(e) {
    e.preventDefault()

    if (this.state.subjectArea.type !== FOCUS_POINT) {
      return
    }

    const { naturalWidth, width } = this.imageRef.current

    const renderedPos = calculateClickPosition(e)
    const scale = calculateScale(naturalWidth, width)
    const actualPos = scalePosition(renderedPos, scale)

    this.setState({
      subjectArea: Object.assign({}, this.state.subjectArea, {
        coords: {
          x: actualPos.x,
          y: actualPos.y,
          width: 1,
          height: 1
        },
        coordsChanged: true
      })
    })
  }

  toggleFocusMenu(e) {
    e.preventDefault()

    const { subjectArea } = this.state

    const newSubjectArea = {
      menuActive: !subjectArea.menuActive
    }
    if (!newSubjectArea.menuActive) {
      newSubjectArea.type = null
      newSubjectArea.coords = EMPTY_FOCUS_AREA
      newSubjectArea.coordsChanged = true
    }

    this.setState({
      subjectArea: Object.assign({}, subjectArea, newSubjectArea)
    })
  }

  toggleFocusForm(e) {
    e.preventDefault()

    const { subjectArea } = this.state

    const newSubjectArea = {
      type: subjectArea.type ? null : e.currentTarget.id
    }

    if (!newSubjectArea.type) {
      newSubjectArea.coords = EMPTY_FOCUS_AREA
      newSubjectArea.coordsChanged = true
    } else if (newSubjectArea.type === FOCUS_POINT) {
      const img = this.imageRef.current
      newSubjectArea.coords = {
        x: Math.round(img.naturalWidth / 2),
        y: Math.round(img.naturalHeight / 2),
        width: 1,
        height: 1
      }
      newSubjectArea.coordsChanged = true
    }

    if (newSubjectArea.type === FOCUS_POINT) {
      this.addResizeListener()
    } else {
      this.removeResizeListener()
    }

    this.setState({
      subjectArea: Object.assign({}, subjectArea, newSubjectArea)
    })
  }

  onClickDeleteImage() {
    this.setState({
      confirmDeleteImage: true
    })
  }

  onLockImage(lock) {
    const {
      router: { match },
      auth: { organization }
    } = this.props
    const {
      params: { hash }
    } = match

    rokka()
      .sourceimages.setLocked(organization, hash, lock)
      .catch(e => {
        console.log(e)
        setAlert('error', `Error (un)locking image`, 5000)
      })
      .then(response => {
        console.log(response.body)
        this.setState({ image: { ...this.state.image, locked: response.body.locked } })
      })
  }

  onCancelDeleteImage() {
    this.setState({
      confirmDeleteImage: false
    })
  }

  onConfirmDeleteImage() {
    const { hash } = this.state.image

    deleteImage(hash)
      .then(() => {
        setTimeout(() => {
          this.props.router.history.push(`/images`)
          setAlert('success', `Image ${hash} has been deleted.`, 5000)
        }, 2000)
      })
      .catch(err => {
        console.error(err)

        this.onCancelDeleteImage()
        setAlert('error', `Error deleting image ${hash}`, 5000)
      })
  }

  render() {
    let $confirmDeleteModal = null
    if (this.state.confirmDeleteImage) {
      $confirmDeleteModal = (
        <Modal onClose={() => this.onCancelDeleteImage()}>
          <h2 className="rka-h1">Do you really want to delete this image?</h2>
          <p className="mt-lg mb-md txt-md lh-lg">
            Please confirm whether your image
            <span className="txt-bold ml-xs">{this.state.image.hash}</span> should be deleted. This
            is an operation that cannot be undone in the Dashboard (but via the API).
          </p>
          <button
            className="rka-button rka-button-negative mr-md mt-md"
            onClick={() => this.onConfirmDeleteImage()}
          >
            Yes, delete this image
          </button>
          <button
            className="rka-button rka-button-secondary mt-md"
            onClick={() => this.onCancelDeleteImage()}
          >
            Cancel
          </button>
        </Modal>
      )
    }
    const { image, subjectArea } = this.state
    if (!image) {
      return (
        <BaseLayout {...this.props}>
          <Spinner />
        </BaseLayout>
      )
    }

    const { user_metadata: metadata } = image
    const { addMetadata } = this.state
    const { type, menuActive } = subjectArea
    let coords = subjectArea.coords

    let renderPos = coords
    if (this.focusPointRef.current && type === FOCUS_POINT) {
      const { naturalWidth, width } = this.imageRef.current
      const scale = calculateScale(naturalWidth, width)
      renderPos = calculateRenderedPosition(
        scale,
        this.focusPointRef.current.clientWidth,
        subjectArea.coords
      )
    }

    if (subjectArea.type === FOCUS_AREA) {
      coords = this.getPercentCrop(coords)
    }

    const imgClassName = cx('rka-crop-image', {
      'dis-n': type === FOCUS_AREA,
      'cur-p': type === FOCUS_POINT
    })
    return (
      <Fragment>
        <Header
          image={image}
          focusMenuActive={menuActive}
          onClickToggleFocusMenu={this.toggleFocusMenu}
          onClickSave={this.onSave}
        />
        <section className="mb-n bg-chess bor-light">
          <Actions
            menuActive={menuActive}
            actionsActive={type !== null}
            onChange={this.onCropChange}
            onToggleActions={this.toggleFocusForm}
            focusArea={subjectArea.coords}
            focusType={type}
          />
          <div className="rka-crop-container pos-r">
            {type === FOCUS_AREA ? (
              <ReactCrop
                src={image.url}
                crop={coords}
                onChange={this.onImageCropChange}
                onComplete={this.onCropComplete}
              />
            ) : null}
            <div className="ove-h dis-ib pos-r va-m">
              <img
                ref={this.imageRef}
                onLoad={() => this.setImgRefSize()}
                src={image.url}
                className={imgClassName}
                onClick={this.onImageClick}
                onTouchStart={this.onImageClick}
                alt="Current"
              />
              <FocusPointSvg
                ref={this.focusPointRef}
                isVisible={type === FOCUS_POINT}
                {...renderPos}
              />
            </div>
          </div>
        </section>
        <UserMetadata
          metadata={metadata}
          addMetadata={addMetadata}
          onChange={this.onChangeMetadata}
          onClickAdd={this.onAddMetadata}
          onClickRemove={this.onRemoveMetadata}
          disabled={this.state.image && this.state.image.locked}
        />
        <div className="pb-md ph-md bg-white">
          <button className="rka-button rka-button-brand mt-sm" onClick={this.onSave}>
            Save
          </button>
          {this.state.image && !this.state.image.locked && (
            <button
              className="rka-button rka-button-brand ml-sm"
              onClick={() => this.onLockImage(true)}
            >
              Lock image
            </button>
          )}
          {this.state.image && this.state.image.locked ? (
            <button
              className="rka-button rka-button-brand  ml-sm"
              onClick={() => this.onLockImage(false)}
            >
              Unlock image
            </button>
          ) : (
            <button
              className="rka-button rka-button-negative   ml-sm"
              onClick={() => this.onClickDeleteImage()}
            >
              Delete image
            </button>
          )}
        </div>
        <div className="section rka-box no-min-height mt-sm">
          Locking an image prevents it from deletion and user metadata changes.
        </div>
        {$confirmDeleteModal}
      </Fragment>
    )
  }
}
ImageDetail.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  router: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        hash: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
}

export default authRequired(ImageDetail)
