import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import rokka from '../../rokka'
import Image from './Image'
import SearchForm from './SearchForm'
import Spinner from '../Spinner'
import Alert from '../Alert'

function getRokkaType(key) {
  switch (key) {
    case 'created':
      return 'date'
    case 'height':
    // fallthrough
    case 'size':
    // fallthrough
    case 'width':
      return 'int'
    default:
      return 'str'
  }
}

const defaultSearchField = 'name'

class ImageList extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      images: {
        items: []
      },
      loading: true,
      currentOffset: 0,
      searchField: defaultSearchField,
      searchValue: '',
      sortField: 'created',
      sortOrder: 'desc',
      searchDataType: 'str',
      fields: {}
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  componentDidMount() {
    this.loadImages()
  }

  onSearchChange(name, { value = null }, reload = false) {
    const stateChange = {
      [name]: value
    }

    if (name === 'searchField' && value === null) {
      stateChange.searchValue = ''
      stateChange.searchField = ''
      reload = true
    }

    // rather ugly way to achieve lookup in current fields.
    let { fields } = this.state

    // allow searching/sorting for/by custom field names
    if (
      (name === 'searchField' || name === 'sortField') &&
      !this.state.fields[value] &&
      value !== null &&
      !value.includes('user:')
    ) {
      stateChange.fields = Object.assign({}, this.state.fields, {
        [value]: { value: value, label: value, userMetadata: true }
      })
      fields = stateChange.fields
      stateChange[name] = value
    }

    if (name === 'searchField' && fields[value] && fields[value].type) {
      stateChange.searchDataType = fields[value].type
    }

    this.setState(stateChange, () => {
      if (reload) {
        this.loadImages()
      }
    })
  }

  onSearchSubmit(e) {
    e.preventDefault()

    this.setState({
      currentOffset: 0,
      images: {
        items: []
      },
      loading: true
    })

    this.loadImages()
  }

  loadImages(append = false) {
    const {
      fields,
      currentOffset,
      images,
      searchField,
      searchValue,
      searchDataType,
      sortField,
      sortOrder
    } = this.state
    const offset = append ? currentOffset : 0
    const sort = sortField && sortOrder ? `${sortField} ${sortOrder}` : null

    const search = {}
    if (searchField && searchValue) {
      let fieldName = searchField
      if (fields[searchField].userMetadata) {
        const dt = fields[searchField].type !== searchDataType ? `:${searchDataType}` : ''
        fieldName = `user${dt}:${searchField}`
      }
      search[fieldName] = searchValue
    }

    rokka()
      .sourceimages.list(this.props.organization, { limit: this.props.limit, offset, search, sort })
      .then(({ body }) => {
        const { fields } = this.state
        body.items.forEach(item => {
          Object.keys(item).forEach(key => {
            if (fields[key] || key === 'dynamic_metadata' || key === 'organization') {
              return
            }
            if (key === 'user_metadata') {
              Object.keys(item[key]).forEach(userKey => {
                if (fields[userKey]) {
                  return
                }
                if (userKey.indexOf(':') >= 0) {
                  const [dataType, keyName] = userKey.split(':')
                  fields[userKey] = {
                    type: dataType,
                    value: userKey,
                    label: keyName,
                    userMetadata: true
                  }
                  return
                }
                fields[userKey] = {
                  type: 'str',
                  value: userKey,
                  label: userKey,
                  userMetadata: true
                }
              })
              return
            }
            fields[key] = { type: getRokkaType(key), value: key, label: key }
          })
        })

        this.setState({
          images: Object.assign({}, images, {
            total: body.total,
            items: append ? [...images.items, ...body.items] : body.items
          }),
          currentOffset: currentOffset + this.props.limit,
          loading: false,
          fields
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  renderImageList() {
    if (this.state.loading) {
      return <Spinner />
    }

    const { images = [] } = this.props

    if (this.state.images.total === 0 && !images.length) {
      return (
        <div className="mt-lg">
          <Alert alert={{ type: 'pending', message: 'No images found.' }} />
        </div>
      )
    }

    const { highlight } = this.props

    return this.state.images.items.map(item => {
      const format = item.format === 'jpg' ? 'jpg' : 'png'
      const imgUrl = rokka().render.getUrl(this.props.organization, item.hash, format, 'dynamic')
      const imgSrc = rokka().render.getUrl(
        this.props.organization,
        item.hash,
        format,
        'dynamic/resize-height-120'
      )

      return (
        <Image
          key={item.hash}
          url={imgUrl}
          src={imgSrc}
          {...item}
          onClick={this.props.onClickImage}
          className={item.hash === highlight ? 'is-highlighted' : null}
        />
      )
    })
  }

  render() {
    const { highlight, className = '', enableSearch = false } = this.props

    let $uploadedImages = null
    if (this.props.images) {
      $uploadedImages = this.props.images.map((image, idx) => {
        const format = image.format === 'jpg' ? 'jpg' : 'png'
        const imgUrl = rokka().render.getUrl(this.props.organization, image.hash, format, 'dynamic')
        const imgSrc = rokka().render.getUrl(
          this.props.organization,
          image.hash,
          format,
          'dynamic/resize-height-120'
        )
        return (
          <Image
            key={idx + image.name}
            url={imgUrl}
            src={imgSrc}
            {...image}
            onClick={this.props.onClickImage}
            className={image.hash === highlight ? 'is-highlighted' : null}
          />
        )
      })
    }

    const hasNextPage = this.state.currentOffset < this.state.images.total
    const $loadMore =
      hasNextPage && this.props.enableLoadMore ? (
        <button className="rka-button rka-button-brand mt-md" onClick={() => this.loadImages(true)}>
          Load more
        </button>
      ) : null

    let $searchForm = null
    if (enableSearch) {
      $searchForm = (
        <SearchForm
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          fields={this.state.fields}
          searchField={this.state.searchField}
          searchValue={this.state.searchValue}
          searchDataType={this.state.searchDataType}
          sortField={this.state.sortField}
          sortOrder={this.state.sortOrder}
        />
      )
    }

    return (
      <div className={className}>
        {$searchForm}
        <div className="row">
          {$uploadedImages}
          {this.renderImageList()}
        </div>
        <div className="txt-c">{$loadMore}</div>
      </div>
    )
  }
}

ImageList.propTypes = {
  limit: PropTypes.number.isRequired,
  organization: PropTypes.string.isRequired,
  images: PropTypes.array,
  enableSearch: PropTypes.bool,
  enableLoadMore: PropTypes.bool,
  highlight: PropTypes.string,
  onClickImage: PropTypes.func,
  className: PropTypes.string
}

export default ImageList
