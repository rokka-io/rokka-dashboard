import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { toggleSidebar, logout } from '../state'
import avatarIcon from '../img/avatar-placeholder.svg'
import logoutIcon from '../img/logout-icon.svg'
import cx from 'classnames'

const Header = (props) =>
  <header className="rka-header">
    <button className={cx('rka-link-button rka-header-menu-icon', {'is-active': props.active})}
      onClick={(e) => { toggleSidebar(); e.preventDefault() }} />
    <Link to="/" className="rka-header-logo" />
    <nav className="rka-header-nav">
      <div className="rka-user">
        <div className="rka-avatar">
          <svg className="rka-avatar-icon">
            <use xlinkHref={avatarIcon + '#avatar'} />
          </svg>
        </div>
        <span className="rka-username">{props.auth.organization}</span>
      </div>
      <button className="rka-link-button rka-logout" onClick={(e) => { e.preventDefault(); logout() }}>
        <svg className="rka-logout-icon">
          <use xlinkHref={logoutIcon + '#logout'} />
        </svg>
      </button>
    </nav>
  </header>

Header.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired
}

export default Header
