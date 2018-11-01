import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'
import { FOCUS_POINT, FOCUS_AREA } from './constants'
import CropForm from './CropForm'
import focusPointIcon from '../../img/focuspoint-icon.svg'
import focusAreaIcon from '../../img/focusarea-icon.svg'

const Actions = ({
  menuActive,
  actionsActive,
  onChange,
  onToggleActions,
  focusArea = {},
  focusType = null
}) => (
  <div className={cx('rka-crop-actions', { 'is-active': menuActive })}>
    <div className={cx('rka-crop-action-container', { 'is-active': actionsActive })}>
      <button
        id="focusPoint"
        onClick={onToggleActions}
        className={cx('rka-crop-action', { 'is-active': focusType === FOCUS_POINT })}
      >
        <svg className="rka-focuspoint-icon">
          <use xlinkHref={focusPointIcon + '#focuspointicon'} />
        </svg>
      </button>
      <button
        id="focusArea"
        onClick={onToggleActions}
        className={cx('rka-crop-action', { 'is-active': focusType === FOCUS_AREA })}
      >
        <svg className="rka-focusarea-icon">
          <use xlinkHref={focusAreaIcon + '#focusareaicon'} />
        </svg>
      </button>
    </div>
    <div className={cx('rka-crop-actions-form', { 'is-active': actionsActive })}>
      {actionsActive ? (
        <CropForm
          onChange={onChange}
          disableWidthHeight={focusType === FOCUS_POINT}
          {...focusArea}
        />
      ) : null}
    </div>
    {actionsActive ? (
      <div className="rka-crop-actions-close-container">
        <button onClick={onToggleActions} className="rka-crop-actions-close">
          ×
        </button>
      </div>
    ) : null}
  </div>
)
Actions.propTypes = {
  menuActive: PropTypes.bool.isRequired,
  actionsActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleActions: PropTypes.func.isRequired,
  focusArea: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  focusType: PropTypes.string
}

export default Actions
