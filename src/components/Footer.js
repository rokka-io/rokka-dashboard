import React, { Component } from 'react'

class Footer extends Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <footer className="rka-footer">
        Rokka &copy; 2017
      </footer>
    )
  }
}

export default Footer
