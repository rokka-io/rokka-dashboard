import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import moment from 'moment'
import focusIcon from '../../img/focus-icon.svg'
import linkicon from '../../img/link-icon.svg'

const Header = ({ image, focusMenuActive, onClickToggleFocusMenu, onClickSave }) => (
  <div className="rka-content-header clearfix">
    <div className="flo-l">
      <h1 className="rka-h1">{image.name}</h1>
      <p className="txt-gray-darker mt-sm txt-sm txt-italic">
        <span className="mr-sm">{moment(image.created).fromNow()},</span>
        <span className="mr-sm">{`${Math.round(image.size / 1024)}KB`},</span>
        <span className="mr-sm">{[image.width || '?', image.height || '?'].join('×')},</span>
        <span className="mr-sm">{image.format.toUpperCase()},</span>
        <span className="">
          <a
            className="rka-link rka-hash-link"
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.hash}
            <svg className="rka-link-icon">
              <use xlinkHref={linkicon + '#linkicon'} />
            </svg>
          </a>
        </span>
        <span style={{ marginLeft: 30 }}>
          <a
            className="rka-link rka-hash-link"
            href={image.url.replace(image.hash, image.short_hash)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {image.short_hash}
            <svg className="rka-link-icon">
              <use xlinkHref={linkicon + '#linkicon'} />
            </svg>
          </a>
        </span>
      </p>
    </div>
    <div className="flo-r">
      <button
        className={cx('rka-focus-trigger', 'mr-md', { 'is-active': focusMenuActive })}
        onClick={onClickToggleFocusMenu}
      >
        {focusMenuActive ? (
          <span className="rka-focus-icon txt-c txt-lg">×</span>
        ) : (
          <svg className="rka-focus-icon">
            <use xlinkHref={focusIcon + '#focusicon'} />
          </svg>
        )}
      </button>
      <button className="rka-button rka-button-brand mt-sm" onClick={onClickSave}>
        Save
      </button>
    </div>
  </div>
)
Header.propTypes = {
  image: PropTypes.shape({
    name: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    format: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired,
  focusMenuActive: PropTypes.bool.isRequired,
  onClickToggleFocusMenu: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired
}

export default Header
