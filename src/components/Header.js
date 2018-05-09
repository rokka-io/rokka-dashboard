import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { toggleSidebar, logout } from '../state'
import avatarIcon from '../img/avatar-placeholder.svg'
import logoutIcon from '../img/logout-icon.svg'
import cx from 'classnames'

const Header = (props) =>
  <header className="rka-header">
    <a href="#" className={cx('rka-header-menu-icon', {'is-active': props.active})}
      onClick={(e) => { toggleSidebar(); e.preventDefault() }} />
    <Link to="/" className="rka-header-logo" />
    <nav className="rka-header-nav">
      <a className="rka-user">
        {/* !user (avatar placeholder) */}
        <div className="rka-avatar">
          <svg className="rka-avatar-icon">
            <use xlinkHref={avatarIcon + '#avatar'} />
          </svg>
        </div>
        <span className="rka-username">{props.auth.organization}</span>
      </a>
      <a href="#" className="rka-logout" onClick={(e) => { e.preventDefault(); logout() }}>
        <svg className="rka-logout-icon">
          <use xlinkHref={logoutIcon + '#logout'} />
        </svg>
      </a>
    </nav>
  </header>

Header.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired
}

export default Header
