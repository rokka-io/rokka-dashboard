import React, { Component, PropTypes } from 'react'
import { Link, IndexLink } from 'react-router'
import { listStacks } from '../state'
import addIcon from '../img/add-icon.svg'
import cx from 'classnames'
import searchIcon from '../img/search.svg'

class Sidebar extends Component {
  loadNextStacks () {
    listStacks()
  }

  componentDidMount () {
    if (!this.props.stacks.items) {
      this.loadNextStacks()
    }
  }

  render () {
    const routePath = this.props.router.location.pathname
    const showStacks = routePath.indexOf('/stack') >= 0 || routePath === '/new-stack'
    const { items = [], currentOffset = 0, total = 0 } = this.props.stacks

    const $stacks = items.map((stack) => {
      return (
        <Link key={stack.name} to={`/stacks/${stack.name}`} activeClassName="is-active" className="rka-sidebar-sublink txt-ellipsis">{stack.name}</Link>
      )
    })

    const $loadMore = currentOffset < total
      ? <button className="rka-button rka-button-brand rka-button-fullwidth"
        onClick={() => this.loadNextStacks()}>Load more</button> : null

    return (
      <sidebar className={cx('rka-sidebar', {'is-active': this.props.active})}>
        <ul className="rka-sidebar-nav">
          <li>
            <IndexLink to="/" className="rka-sidebar-link" activeClassName="is-active">Dashboard</IndexLink>
          </li>
          <li>
            <Link to="/images" className="rka-sidebar-link" activeClassName="is-active">Images</Link>
          </li>
          <li className="pos-r">
            <Link to="/stacks" className="rka-sidebar-link" activeClassName="is-active">
              Stacks
            </Link>
            <Link to="new-stack" className="rka-sidebar-link-icon" activeClassName="is-active">
              <svg className="rka-add-icon">
                <use xlinkHref={addIcon + '#add-icon'} />
              </svg>
            </Link>
            <div className={cx('rka-sidebar-subnav', {'is-active': showStacks})}>
              <div className="rka-stacks-search-container">
                <input className="rka-input-txt rka-stack-search" type="text" placeholder="Search stack..." />
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
      </sidebar>
    )
  }
}

Sidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  router: PropTypes.object.isRequired,
  stacks: PropTypes.shape({
    currentOffset: PropTypes.number,
    items: PropTypes.array,
    total: PropTypes.number
  })
}

export default Sidebar
