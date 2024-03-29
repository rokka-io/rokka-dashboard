import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getRenderUrl } from '../../rokka'
import Alert from '../Alert'

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

  const [preview, setPreview] = useState(null)
  const format = previewImage.format === 'jpg' ? 'jpg' : 'png'
  const previewImages = {
    original: getRenderUrl(organization, previewImage.hash, format),
    dynamic: currentPreviewImage
      ? currentPreviewImage.src
      : getRenderUrl(organization, previewImage.hash, format, stack, {
          filename: 'preview_v' + Math.floor(new Date().getTime() / 10 / 1000)
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
        {error ? (
          imageLoading ? (
            <Alert alert={{ type: 'info', message: 'Image loading.' }} />
          ) : (
            <Alert alert={{ type: 'info', message: 'Stack config is not valid.' }} />
          )
        ) : (
          <img src={preview || previewImage.dynamic} alt="Customized" />
        )}
      </div>
      <img
        src={previewImages.dynamic}
        alt="Customized"
        style={{ display: 'none' }}
        onLoad={e => {
          setPreview(e.target.src)
        }}
      />
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
