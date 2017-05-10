import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Input from './Input'

class InputRange extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value || this.props.defaultValue,
      showMinMax: false
    }
  }

  onChange (e) {
    this.setState({
      value: e.currentTarget.value,
      showMinMax: true
    })

    this.props.onChange(e)
  }

  onBlur (e) {
    this.setState({
      showMinMax: false
    })
  }

  render () {
    return (
      <div className="rka-input-range-container clearfix">
        <Input name={this.props.name} className="rka-input-range" type="range" disabled={!this.props.onChange} onChange={(e) => this.onChange(e)}
          onBlur={(e) => this.onBlur(e)} min={this.props.min} max={this.props.max} value={this.state.value}
          defaultValue={this.props.defaultValue}
        />
        <p>
          <span className={cx('rka-input-range-min', { 'is-active': this.state.showMinMax })}>{this.props.min}</span>
          <span className={cx('rka-input-range-current txt-bold', { 'is-disabled': !this.props.onChange })}>
            {this.state.value}
          </span>
          <span className={cx('rka-input-range-max', { 'is-active': this.state.showMinMax })}>{this.props.max}</span>
        </p>
      </div>
    )
  }
}

InputRange.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
}

export default InputRange
