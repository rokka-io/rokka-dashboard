import React, { PureComponent } from 'react'
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import state, { subscribe } from '../state'
import Dashboard from './Dashboard'
import Images from './Images'
import Bills from './Bills'
import Signup from './Signup'
import Stacks from './Stacks'
import NewStack from './NewStack'
import '../scss/main.scss'

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = state

    this.unsubscribe = subscribe(state => {
      this.setState(state)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route path="/" exact render={props => <Dashboard router={props} {...this.state} />} />
          <Route path="/images" render={props => <Images router={props} {...this.state} />} />
          <Route path="/bills" render={props => <Bills router={props} {...this.state} />} />
          <Route path="/signup" render={props => <Signup router={props} {...this.state} />} />
          <Route path="/stacks" render={props => <Stacks router={props} {...this.state} />} />
          <Route path="/new-stack" render={props => <NewStack router={props} {...this.state} />} />
        </div>
      </HashRouter>
    )
  }
}

export default App
