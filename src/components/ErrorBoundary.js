import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

// See https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html for an explanation
class ErrorBoundary extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    console.error(error, info)

    // Display fallback UI
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return (
        <div className="bg-white pa-md clearfix">
          <h1 className="rka-h1">Something went wrong.</h1>
          <p>Unable to load the page 😟. Please <a className="rka-link" target="_blank" href="https://github.com/rokka-io/rokka-dashboard/issues">file an issue on GitHub</a>. Thanks! 😍</p>
        </div>
      )
    }
    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
