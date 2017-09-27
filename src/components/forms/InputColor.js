import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import enhanceWithClickOutside from 'react-click-outside'

class InputColor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showColorPicker: false
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange ({hex}) {
    this.props.onChange({
      name: this.props.name,
      value: hex.replace('#', '')
    })
  }

  toggleColorPicker () {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    })
  }

  handleClickOutside () {
    this.setState({
      showColorPicker: false
    })
  }

  render () {
    return (
      <div className="rka-form-group">
        <input name={this.props.name} type="text" className="rka-input-txt" placeholder={`color (default: ${this.props.defaultValue})`}
          value={this.props.value || ''} onClick={() => this.toggleColorPicker()} readOnly disabled={!this.props.onChange} />
        { this.state.showColorPicker ? <ChromePicker disableAlpha color={this.props.value}
          onChangeComplete={this.handleChange} />
          : null }
      </div>
    )
  }
}

InputColor.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
}

export default enhanceWithClickOutside(InputColor)
