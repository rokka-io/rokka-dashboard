import React, { PureComponent } from 'react'
import { Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import state, { subscribe } from '../state'
import Dashboard from './Dashboard'
import Images from './Images'
import Costs from './Costs'
import Signup from './Signup'
import Stacks from './Stacks'
import NewStack from './NewStack'
import '../scss/main.scss'
import Apikeys from './Apikeys'
import Signedup from './Signedup'
import Memberships from './Memberships'

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
          <Route path="/costs" render={props => <Costs router={props} {...this.state} />} />
          <Route path="/apikeys" render={props => <Apikeys router={props} {...this.state} />} />
          <Route
            path="/memberships"
            render={props => <Memberships router={props} {...this.state} />}
          />
          <Route path="/signup" render={props => <Signup router={props} {...this.state} />} />
          <Route path="/signedup" render={props => <Signedup router={props} {...this.state} />} />
          <Route path="/stacks" render={props => <Stacks router={props} {...this.state} />} />
          <Route
            path="/stacks/:name/:tabindex?"
            render={props => <Stacks router={props} {...this.state} />}
          />
          <Route
            path="/new-stack/:tabindex?"
            render={props => <NewStack router={props} {...this.state} />}
          />
        </div>
      </HashRouter>
    )
  }
}

export default App
