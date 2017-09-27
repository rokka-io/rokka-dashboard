import React, { PropTypes } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import cx from 'classnames'
import Header from '../Header.js'
import Footer from '../Footer.js'
import Sidebar from '../Sidebar.js'
import Alert from '../Alert'

const BaseLayout = ({ className, alert = null, ...props }) =>
  <div className={className}>
    <Header auth={props.auth} active={props.showSidebar} />
    <Sidebar active={props.showSidebar} stacks={props.stacks} router={props.router} />
    <TransitionGroup>
      <CSSTransition timeout={{enter: 0, appear: 500, exit: 0}} appear classNames="page-transition">
        <main className={cx('main clearfix', {'is-active': props.showSidebar})}>
          <Alert alert={alert} />
          {props.children}
        </main>
      </CSSTransition>
    </TransitionGroup>
    <Footer />
  </div>

BaseLayout.propTypes = {
  auth: PropTypes.object.isRequired,
  showSidebar: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  router: PropTypes.object.isRequired,
  className: PropTypes.string,
  alert: PropTypes.object,
  stacks: PropTypes.shape({
    currentOffset: PropTypes.number,
    items: PropTypes.array,
    total: PropTypes.number
  })
}

export default BaseLayout
