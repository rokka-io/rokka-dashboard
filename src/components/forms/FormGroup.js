import React, { PropTypes } from 'react'
import cx from 'classnames'
import RequiredIndicator from './RequiredIndicator'

const FormGroup = ({ label, children, classname = null, required = false, error = null }) => (
  <div className={cx('rka-form-group', classname, {'has-error': !!error})}>
    <label className="rka-label">
      {label}
      <RequiredIndicator required={required} />
    </label>
    {children}
    {error ? <div className="mt-xs txt-xs txt-cranberry">{error}</div> : null}
  </div>
)
FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  classname: PropTypes.string,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string
}

export default FormGroup
