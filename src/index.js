import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

// ReactDOM.render(
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Dashboard} />
//       <Route path="images">
//         <IndexRoute component={Images} />
//         <Route path=":hash" component={ImageDetail} />
//       </Route>
//       <Route path="signup" component={Signup} />
//       <Route path="stacks" component={Stacks}>
//         <IndexRoute component={NoStackSelected} />
//         <Route path=":name" component={Stack} />
//         <Route path="/new-stack" component={NewStack} />
//       </Route>
//     </Route>
//   </Router>,
//   document.getElementById('root')
// )
render(<App />, document.getElementById('root'))
