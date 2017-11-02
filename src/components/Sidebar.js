import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { listStacks } from '../state'
import addIcon from '../img/add-icon.svg'
import cx from 'classnames'
import searchIcon from '../img/search.svg'

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
    if (!this.props.stacks.items) {
      this.loadNextStacks()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stacks.items) {
      this.setState({
        items: nextProps.stacks.items
      })
    }
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
        <Link key={stack.name} to={`/stacks/${stack.name}`} activeClassName="is-active" className="rka-sidebar-sublink txt-ellipsis">{stack.name}</Link>
      )
    })

    const $loadMore = currentOffset < total
      ? <button className="rka-button rka-button-brand rka-button-fullwidth"
        onClick={() => this.loadNextStacks()}>Load more</button> : null

    return (
      <nav className={cx('rka-sidebar', {'is-active': this.props.active})}>
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
