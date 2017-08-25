import React, { PropTypes } from 'react'
import Alert from '../Alert'

const FramelessLayout = ({ children, className = null, alert = null }) =>
  <div className={className}>
    <Alert alert={alert} />
    {children}
  </div>

FramelessLayout.propTypes = {
  children: PropTypes.node.isRequired,
  alert: PropTypes.object,
  className: PropTypes.string
}

export default FramelessLayout
