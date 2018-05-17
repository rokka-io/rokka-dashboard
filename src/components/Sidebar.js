import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { listStacks } from '../state'
import addIcon from '../img/add-icon.svg'
import cx from 'classnames'
import searchIcon from '../img/search.svg'

function isStacksActive (match, location) {
  if (match) {
    return true
  }
  return location.pathname === '/new-stack'
}

class Sidebar extends Component {
  constructor (props) {
    super(props)

    const { items = [] } = props.stacks

    this.state = { items }
  }

  loadNextStacks () {
    listStacks()
  }

  componentDidMount () {
    if (!this.props.stacks.items && !this.state.items.length) {
      this.loadNextStacks()
    }
  }

  static getDerivedStateFromProps (nextProps) {
    if (nextProps.stacks.items) {
      return {
        items: nextProps.stacks.items
      }
    }
    return null
  }

  filterStacks (e) {
    const query = e.target.value
    const items = this.props.stacks.items.filter((item) => {
      return item.name.indexOf(query) > -1
    })

    this.setState({
      items
    })
  }

  render () {
    const routePath = this.props.router.location.pathname
    const showStacks = routePath.indexOf('/stack') >= 0 || routePath === '/new-stack'
    const { currentOffset = 0, total = 0 } = this.props.stacks

    const $stacks = this.state.items.map((stack) => {
      return (
        <NavLink
          key={stack.name}
          to={`/stacks/${stack.name}`}
          activeClassName="is-active"
          className="rka-sidebar-sublink txt-ellipsis"
        >
          {stack.name}
        </NavLink>
      )
    })

    const $loadMore = currentOffset < total
      ? <button className="rka-button rka-button-brand rka-button-fullwidth"
        onClick={() => this.loadNextStacks()}>Load more</button> : null

    return (
      <nav className={cx('rka-sidebar', {'is-active': this.props.active})}>
        <ul className="rka-sidebar-nav">
          <li>
            <NavLink to="/" exact className="rka-sidebar-link" activeClassName="is-active">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/images" className="rka-sidebar-link" activeClassName="is-active">Images</NavLink>
          </li>
          <li className="pos-r">
            <NavLink to="/stacks" className="rka-sidebar-link" activeClassName="is-active" isActive={isStacksActive}>
              Stacks
            </NavLink>
            <NavLink to="/new-stack" className="rka-sidebar-link-icon" activeClassName="is-active">
              <svg className="rka-add-icon">
                <use xlinkHref={addIcon + '#add-icon'} />
              </svg>
            </NavLink>
            <div className={cx('rka-sidebar-subnav', {'is-active': showStacks})}>
              <div className="rka-stacks-search-container">
                <input className="rka-input-txt rka-stack-search" type="text" placeholder="Search stack..."
                  onChange={(e) => this.filterStacks(e)} />
                <svg className="rka-stack-search-icon">
                  <use xlinkHref={searchIcon + '#search-icon'} />
                </svg>
              </div>
              <div className={cx('rka-stacks-list', {'is-loaded': !$loadMore})}>
                {$stacks}
                <div className="rka-stacks-load">
                  {$loadMore}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <a href="https://www.liip.ch/" target="_blank" className="rka-sidebar-poweredby">
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
    total: PropTypes.number
  }).isRequired
}

export default Sidebar
