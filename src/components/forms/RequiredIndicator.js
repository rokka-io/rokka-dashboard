import PropTypes from 'prop-types'
import React from 'react'

const RequiredIndicator = ({ required }) => (required ? <span> *</span> : null)
RequiredIndicator.propTypes = {
  required: PropTypes.bool
}

export default RequiredIndicator
