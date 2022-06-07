import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import rokka from '../../rokka'
import Modal from '../Modal'
import ImageList from './List'

const validFormats = ['jpg', 'png']
const defaultFormat = 'png'
const ROKKA_DASHBOARD_PREVIEW_IMAGE = 'rokka-dashboard-preview-image'
function adjustImageFormat({ format, ...properties }) {
  const preview = {
    ...properties,
    format: validFormats.includes(format) ? format : defaultFormat
  }
  window.sessionStorage.setItem(ROKKA_DASHBOARD_PREVIEW_IMAGE, JSON.stringify(preview))
  return preview
}

/**
 * previewImage is a HOC used for being able to select
 * a preview image from all the images available in the organization.
 *
 * Usage:
 *   export default previewImage(YourComponent)
 *
 * In your component you'll have two props exposed:
 *   - onOpenChoosePreviewImage: func, will open the modal to choose a preview image
 *   - previewImage: object (hash, format), the preview image itself
 *   - loadPreviewImage: func, call this onComponentDidMount to load an initial preview image
 *
 * @param WrappedComponent
 * @returns {PreviewImage}
 */
export default function previewImage(WrappedComponent) {
  class PreviewImage extends PureComponent {
    constructor(props) {
      super(props)

      this.state = {
        modalOpen: false,
        preview: null
      }

      this.onOpenModal = this.onOpenModal.bind(this)
      this.onCloseModal = this.onCloseModal.bind(this)
      this.onChange = this.onChange.bind(this)
      this.loadPreviewImage = this.loadPreviewImage.bind(this)
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    loadPreviewImage() {
      if (this.state.preview) {
        return
      }

      const { organization } = this.props.auth

      const preview = window.sessionStorage.getItem(ROKKA_DASHBOARD_PREVIEW_IMAGE)
      if (preview) {
        const previewImage = adjustImageFormat(JSON.parse(preview))
        if (previewImage.organization === organization) {
          this.setState({ preview: adjustImageFormat(JSON.parse(preview)) })
          return
        }
      }
      rokka()
        .sourceimages.list(organization, 1)
        .then(({ body }) => {
          if (!this.mounted) {
            return
          }
          this.setState({
            preview: adjustImageFormat(body.items[0])
          })
        })
        .catch(err => {
          console.error(err)
        })
    }

    onOpenModal(e) {
      e.preventDefault()

      this.setState({
        modalOpen: true
      })
    }

    onCloseModal() {
      this.setState({
        modalOpen: false
      })
    }

    onChange(image) {
      this.setState({
        modalOpen: false,
        preview: adjustImageFormat(image)
      })
    }

    render() {
      let $previewModal = null
      if (this.state.modalOpen) {
        $previewModal = (
          <Modal fullscreen onClose={this.onCloseModal}>
            <h2 className="rka-h2">Choose a preview picture</h2>
            <ImageList
              className="mt-md"
              enableLoadMore
              enableSearch
              limit={24}
              organization={this.props.auth.organization}
              onClickImage={(e, image) => this.onChange(image)}
              highlight={this.state.preview.hash}
            />
          </Modal>
        )
      }

      return (
        <div>
          {$previewModal}
          <WrappedComponent
            onOpenChoosePreviewImage={this.onOpenModal}
            loadPreviewImage={this.loadPreviewImage}
            previewImage={this.state.preview}
            {...this.props}
          />
        </div>
      )
    }
  }

  PreviewImage.propTypes = {
    auth: PropTypes.shape({
      organization: PropTypes.string.isRequired
    }).isRequired
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
  PreviewImage.displayName = `PreviewImage(${displayName})`

  return PreviewImage
}
