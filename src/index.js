import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './components/App'
import Dashboard from './components/Dashboard'
import Images from './components/Images'
import ImageDetail from './components/ImageDetail'
import NewStack from './components/NewStack'
import NoStackSelected from './components/NoStackSelected'
import Stacks from './components/Stacks'
import Stack from './components/Stack'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="images">
        <IndexRoute component={Images} />
        <Route path=":hash" component={ImageDetail} />
      </Route>
      <Route path="stacks" component={Stacks}>
        <IndexRoute component={NoStackSelected} />
        <Route path=":name" component={Stack} />
        <Route path="/new-stack" component={NewStack} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
)
