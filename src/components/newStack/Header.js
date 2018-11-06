import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Spinner from '../Spinner'

const Header = ({
  updatePreview,
  previewImage = null,
  createStackBtnDisabled = false,
  isPreviewCurrent = false,
  showLoader = false
}) => (
  <div className="bg-white pa-md clearfix">
    <h1 className="rka-h1 flo-l mt-xs">New stack</h1>
    <div className="flo-r">
      {previewImage && (
        <button
          type="button"
          onClick={e => {
            e.preventDefault()
            updatePreview(previewImage)
          }}
          disabled={isPreviewCurrent}
          className="rka-button rka-button-secondary mr-md"
        >
          Update preview
        </button>
      )}
      <button
        className={cx('rka-button rka-button-brand', { 'disabled flo-r': createStackBtnDisabled })}
        type="submit"
      >
        {showLoader ? (
          <div className="sk-cube-small sk-cube-white">
            <Spinner />
          </div>
        ) : (
          'Create stack'
        )}
      </button>
    </div>
  </div>
)
Header.propTypes = {
  updatePreview: PropTypes.func.isRequired,
  previewImage: PropTypes.object,
  createStackBtnDisabled: PropTypes.bool,
  isPreviewCurrent: PropTypes.bool,
  showLoader: PropTypes.bool
}

export default Header
