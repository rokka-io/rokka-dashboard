import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import focusPointIcon from '../../img/focuspoint-icon.svg'

const FocusPointSvg = ({ setRef, x, y, isVisible = false }) => (
  <div className={cx('rka-focuspoint-icon-container', {'vis-h': !isVisible})} style={{top: y, left: x}} ref={setRef}>
    <svg className="rka-focuspoint-icon">
      <use xlinkHref={focusPointIcon + '#focuspointicon'} />
    </svg>
  </div>
)
FocusPointSvg.propTypes = {
  setRef: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isVisible: PropTypes.bool
}

export default FocusPointSvg
