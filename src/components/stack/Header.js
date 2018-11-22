import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ children, title }) => (
  <div className="bg-white pa-md clearfix">
    <h1 className="rka-h1 flo-l mt-xs">{title}</h1>
    <div className="flo-r">{children}</div>
  </div>
)
Header.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
