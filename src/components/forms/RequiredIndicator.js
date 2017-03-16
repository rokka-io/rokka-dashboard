import React, { PropTypes } from 'react'

const RequiredIndicator = ({ required }) => required ? (<span> *</span>) : null
RequiredIndicator.propTypes = {
  required: PropTypes.bool
}

export default RequiredIndicator
