import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

const Alert = ({ alert = null }) => {
  if (!alert) {
    return null
  }

  let message = alert.message
  if (Array.isArray(message)) {
    message = message.map((msg, index) => (<span className="rka-alert-msg" key={index}>{msg}</span>))
  } else {
    message = (<span className="rka-alert-msg">{message}</span>)
  }

  return <div className={cx('rka-alert', `is-${alert.type}`, 'txt-c')}>{message}</div>
}
Alert.propTypes = {
  alert: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  })
}

export default Alert
