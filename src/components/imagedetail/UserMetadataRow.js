import PropTypes from 'prop-types'
import React from 'react'

const ROKKA_TYPES = [
  {label: 'String', value: 'str'},
  {label: 'Int', value: 'int'},
  {label: 'Double', value: 'double'},
  {label: 'Date', value: 'date'},
  {label: 'Location', value: 'latlon'},
  {label: 'Array', value: 'array'}
]

const UserMetadataRow = ({ index, onChange, onClickRemove, onClickAdd, isNew = false, name = '', type = 'str', value = '' }) => (
  <div key={index} className="rka-image-metadata-container mb-xs">
    {!isNew
      ? <button className="rka-close-icon" onClick={(e) => onClickRemove(e, index)} />
      : null
    }
    <div className="row">
      <div className="col-md-4">
        <div className="rka-form-group mb-n">
          <input
            type="text"
            value={name}
            className="rka-input-txt"
            placeholder="Name"
            onChange={(e) => onChange(isNew, index, {name: e.currentTarget.value})}
          />
        </div>
      </div>
      <div className="col-md-4">
        <div className="rka-form-group mb-n">
          <select className="rka-select" value={type} onChange={(e) => onChange(isNew, index, {type: e.currentTarget.value})}>
            {ROKKA_TYPES.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-4">
        <div className="rka-form-group mb-n">
          <input
            type="text"
            value={value}
            className="rka-input-txt"
            placeholder="Value"
            onChange={(e) => onChange(isNew, index, {value: e.currentTarget.value})}
          />
        </div>
      </div>
    </div>
    {isNew
      ? <button type="button" className="rka-button rka-button-brand rka-button-sm mt-md" onClick={onClickAdd}>Add metadata</button>
      : null
    }
  </div>
)
UserMetadataRow.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
}

export default UserMetadataRow
