import PropTypes from 'prop-types'
import React from 'react'

const CropForm = ({
  onChange,
  x = '',
  y = '',
  width = '',
  height = '',
  disableWidthHeight = false
}) => (
  <div className="row">
    <div className="col-md-3 col-sm-3">
      <div className="rka-form-group">
        <label className="rka-label">Offset X</label>
        <input type="text" name="x" className="rka-input-txt" value={x} onChange={onChange} />
      </div>
    </div>
    <div className="col-md-3 col-sm-3">
      <div className="rka-form-group">
        <label className="rka-label">Offset Y</label>
        <input type="text" name="y" className="rka-input-txt" value={y} onChange={onChange} />
      </div>
    </div>
    <div className="col-md-3 col-sm-3">
      <div className="rka-form-group">
        <label className="rka-label">Width</label>
        <input
          type="text"
          name="width"
          disabled={disableWidthHeight}
          className="rka-input-txt"
          value={width}
          onChange={onChange}
        />
      </div>
    </div>
    <div className="col-md-3 col-sm-3">
      <div className="rka-form-group">
        <label className="rka-label">Height</label>
        <input
          type="text"
          name="height"
          disabled={disableWidthHeight}
          className="rka-input-txt"
          value={height}
          onChange={onChange}
        />
      </div>
    </div>
  </div>
)
CropForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  disableWidthHeight: PropTypes.bool
}

export default CropForm
