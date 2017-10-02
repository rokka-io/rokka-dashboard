import PropTypes from 'prop-types'
import React, { Component, cloneElement } from 'react'
import state, { subscribe } from '../state'
import '../scss/main.scss'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = state

    this.unsubscribe = subscribe((state) => {
      this.setState(state)
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    return (
      <div className="App">
        {this.props.children && cloneElement(this.props.children, this.state)}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
}

export default App
