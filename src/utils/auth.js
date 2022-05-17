import { createElement } from 'react'
import Login from '../components/Login'

export const authRequired = component => props => {
  /* eslint-disable react/prop-types */
  return createElement(props.auth && props.auth.apiToken ? component : Login, props)
}
