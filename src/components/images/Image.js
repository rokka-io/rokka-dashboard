import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import cx from 'classnames'

class Image extends PureComponent {
  constructor() {
    super()
    this.state = {
      imageError: false
    }
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this.props)
    }
  }

  handleImgError() {
    this.setState({ imageError: true })
  }

  render() {
    const classes = cx('rka-image-tile', this.props.className, {
      'is-uploaded': this.props.uploaded,
      'is-uploading': !this.props.uploaded,
      'is-clickable': this.props.onClick
    })

    const specs = [
      this.props.format ? this.props.format.toUpperCase() : null,
      this.props.size ? `${Math.round(this.props.size / 1024)}KB` : null,
      [this.props.width || '?', this.props.height || '?'].join('×')
    ]
      .filter(line => line)
      .join(', ')

    return (
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className={classes} onClick={e => this.onClick(e)}>
          <div className="rka-image-tile-hd">
            <a
              href={this.props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rka-image-tile-link rka-link"
              onClick={e => e.stopPropagation()}
            >
              Open in new window
            </a>
            {this.props.uploaded === true && (
              <span className="rka-image-checkbox-container">
                <i className="roka-image-checkbox rka-checkbox-icon is-checked" />
              </span>
            )}
            {!this.state.imageError ? (
              <img
                src={this.props.src}
                alt={this.props.name}
                onError={() => this.handleImgError()}
              />
            ) : null}
          </div>
          <div className="rka-image-tile-ft">
            <div className="rka-image-tile-specs txt-ellipsis" title={specs}>
              {specs}
            </div>
            <div className="rka-image-tile-name txt-ellipsis" title={this.props.name}>
              {this.props.name}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  format: PropTypes.string,
  uploaded: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default Image
