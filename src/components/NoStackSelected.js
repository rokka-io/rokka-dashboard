import React, { Component } from 'react'
import { authRequired } from '../utils/auth'

class NoStackSelected extends Component {
  render () {
    return (
      <div className="section rka-box">
        No stack selected
      </div>
    )
  }
}

export default authRequired(NoStackSelected)
