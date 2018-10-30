import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import focusPointIcon from '../../img/focuspoint-icon.svg'

const FocusPointSvg = forwardRef(({ x, y, isVisible = false }, ref) => (
  <div className={cx('rka-focuspoint-icon-container', {'vis-h': !isVisible})} style={{top: y, left: x}} ref={ref}>
    <svg className="rka-focuspoint-icon">
      <use xlinkHref={focusPointIcon + '#focuspointicon'} />
    </svg>
  </div>
))
FocusPointSvg.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isVisible: PropTypes.bool
}

export default FocusPointSvg
