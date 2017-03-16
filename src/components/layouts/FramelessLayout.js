import React, { PropTypes } from 'react'
import Alert from '../Alert'

const FramelessLayout = ({ className, alert = null, ...props }) =>
  <div className={className}>
    <Alert alert={alert} />
    {props.children}
  </div>

FramelessLayout.propTypes = {
  children: PropTypes.node.isRequired,
  alert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string
  }),
  className: PropTypes.string
}

export default FramelessLayout
