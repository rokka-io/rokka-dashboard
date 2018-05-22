import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import cx from 'classnames'

class Modal extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      open: (props.open !== false)
    }

    this.onKeyDown = (e) => {
      if (e.keyCode === 27) { // escape
        this.close(e)
      }
    }
  }

  close (e) {
    e.preventDefault()

    this.setState({ open: false })

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  render () {
    if (!this.state.open) {
      return null
    }

    const { classNames = {}, fullscreen } = this.props

    return (
      <div className={cx('rka-modal-backdrop', classNames.backdrop)} onKeyDown={(e) => this.onKeyDown(e)}>
        <div className={cx('rka-modal-frame', classNames.frame, { 'rka-modal-frame-fullscreen': fullscreen })}>
          <div className={cx('rka-modal-body', classNames.body)}>
            <a className={cx('rka-close-icon', classNames.close)}
              href="#" onClick={(e) => this.close(e)} title="Close" />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  fullscreen: PropTypes.bool,
  classNames: PropTypes.shape({
    backdrop: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    frame: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    close: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    body: PropTypes.oneOf([PropTypes.string, PropTypes.object])
  }),
  onClose: PropTypes.func
}

export default Modal
