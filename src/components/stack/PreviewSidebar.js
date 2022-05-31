import React from 'react'
import PropTypes from 'prop-types'
import rokka from '../../rokka'
import Alert from '../Alert'
import Spinner from '../Spinner'

const PreviewSidebar = ({
  organization,
  onChange,
  previewImage = null,
  currentPreviewImage = null,
  error = null,
  imageLoading = false,
  stack = 'dynamic/noop'
}) => {
  if (!previewImage) {
    return null
  }

  const format = previewImage.format === 'jpg' ? 'jpg' : 'png'

  const previewImages = {
    original: rokka().render.getUrl(organization, previewImage.hash, format),
    dynamic: currentPreviewImage
      ? currentPreviewImage.src
      : rokka().render.getUrl(organization, previewImage.hash, format, stack, {
          filename: 'preview_v' + Math.floor(new Date().getTime() / 30 / 1000)
        })
  }

  return (
    <div className="col-md-5 col-sm-5">
      <h3 className="rka-h2 mv-md">
        Preview
        <button onClick={onChange} className="rka-link-button rka-link flo-r txt-sm">
          Change picture
        </button>
      </h3>
      <div className="rka-stack-img-container bg-chess mb-xs bor-light txt-c">
        <p className="pa-md bg-white txt-l">
          Customized
          <a
            href={previewImages.dynamic}
            className="rka-link flo-r"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new window
          </a>
        </p>
        {error ? <Alert alert={{ type: 'error', message: error }} /> : null}
        {imageLoading ? <Spinner /> : <img src={previewImages.dynamic} alt="Customized" />}
      </div>
      <div className="rka-stack-img-container bg-chess bor-light txt-c">
        <p className="pa-md bg-white txt-l">
          Original
          <a
            href={previewImages.original}
            className="rka-link flo-r"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in new window
          </a>
        </p>
        <img src={previewImages.original} alt="Original" />
      </div>
    </div>
  )
}
PreviewSidebar.propTypes = {
  organization: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  previewImage: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired
  }),
  currentPreviewImage: PropTypes.shape({
    src: PropTypes.string.isRequired
  }),
  stack: PropTypes.string,
  error: PropTypes.string,
  imageLoading: PropTypes.bool
}

export default PreviewSidebar
