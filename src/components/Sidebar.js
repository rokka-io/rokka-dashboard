import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { listStacks, filterStacks } from '../state'
import addIcon from '../img/add-icon.svg'
import cx from 'classnames'
import searchIcon from '../img/search.svg'
import { removeStackFromStorage } from './NewStack'

function isStacksActive(match, location) {
  if (match) {
    return true
  }
  return location.pathname === '/new-stack'
}

function isCostsActive(match, location) {
  if (match) {
    return true
  }
  return location.pathname.startsWith('/costs')
}

class Sidebar extends PureComponent {
  loadNextStacks() {
    listStacks()
  }

  componentDidMount() {
    if (!this.props.stacks.items) {
      this.loadNextStacks()
    }
  }

  filterStacks(e) {
    const query = e.target.value
    filterStacks(query)
  }

  render() {
    const routePath = this.props.router.location.pathname
    const showStacks = routePath.indexOf('/stack') >= 0 || routePath.startsWith('/new-stack')

    const showAccessControl = routePath === '/apikeys' || routePath === '/memberships'
    const { currentOffset = 0, total = 0, filteredItems = [] } = this.props.stacks
    const tabindex = this.props.router.match.params.tabindex
    const $stacks = filteredItems
      .filter(stack => !stack.name.startsWith('_preview'))
      .map(stack => {
        return (
          <NavLink
            key={stack.name}
            to={`/stacks/${stack.name}${tabindex ? '/' + tabindex : ''}`}
            activeClassName="is-active"
            className="rka-sidebar-sublink txt-ellipsis"
          >
            {stack.name}
          </NavLink>
        )
      })

    const $loadMore =
      currentOffset < total ? (
        <button
          className="rka-button rka-button-brand rka-button-fullwidth"
          onClick={() => this.loadNextStacks()}
        >
          Load more
        </button>
      ) : null

    return (
      <nav className={cx('rka-sidebar', { 'is-active': this.props.active })}>
        <ul className="rka-sidebar-nav">
          <li>
            <NavLink to="/" exact className="rka-sidebar-link" activeClassName="is-active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/images" className="rka-sidebar-link" activeClassName="is-active">
              Images
            </NavLink>
          </li>

          <li className="pos-r">
            <NavLink
              to="/stacks"
              className="rka-sidebar-link"
              activeClassName="is-active"
              isActive={isStacksActive}
            >
              Stacks
            </NavLink>
            <NavLink
              to="/new-stack"
              className="rka-sidebar-link-icon"
              activeClassName="is-active"
              onClick={removeStackFromStorage}
            >
              <svg className="rka-add-icon">
                <use xlinkHref={addIcon + '#add-icon'} />
              </svg>
            </NavLink>
            <div className={cx('rka-sidebar-subnav', { 'is-active': showStacks })}>
              <div className="rka-stacks-search-container">
                <input
                  className="rka-input-txt rka-stack-search"
                  type="text"
                  placeholder="Search stack..."
                  onChange={e => this.filterStacks(e)}
                />
                <svg className="rka-stack-search-icon">
                  <use xlinkHref={searchIcon + '#search-icon'} />
                </svg>
              </div>
              <div className={cx('rka-stacks-list', { 'is-loaded': !$loadMore })}>
                {$stacks}
                <div className="rka-stacks-load">{$loadMore}</div>
              </div>
            </div>
          </li>
          <li>
            <NavLink
              to="/apikeys"
              exact
              className="rka-sidebar-link"
              activeClassName="is-active"
              isActive={() => showAccessControl}
            >
              Access Control
            </NavLink>
          </li>
          <div className={cx('rka-sidebar-subnav', { 'is-active': showAccessControl })}>
            <NavLink
              to="/apikeys"
              exact
              className="rka-sidebar-sublink"
              activeClassName="is-active"
            >
              User Api-Keys
            </NavLink>
            <NavLink
              to="/memberships"
              exact
              className="rka-sidebar-sublink"
              activeClassName="is-active"
            >
              Org Memberships
            </NavLink>
          </div>
          <li>
            <NavLink
              to="/costs"
              exact
              className="rka-sidebar-link"
              isActive={isCostsActive}
              activeClassName="is-active"
            >
              Costs
            </NavLink>
          </li>
        </ul>
        <a
          href="https://www.liip.ch/"
          target="_blank"
          rel="noopener noreferrer"
          className="rka-sidebar-poweredby"
        >
          POWERED BY <i className="rka-sidebar-liip-logo" />
        </a>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  stacks: PropTypes.shape({
    currentOffset: PropTypes.number,
    items: PropTypes.array,
    filteredItems: PropTypes.array,
    total: PropTypes.number
  }).isRequired
}

export default Sidebar
