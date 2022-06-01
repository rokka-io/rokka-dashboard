import PropTypes from 'prop-types'
import React, { Component } from 'react'
import cx from 'classnames'
import Input from './Input'

function getValue(props) {
  let { value, defaultValue } = props
  if (value === '' || value === null || value === undefined) {
    return defaultValue
  }
  return value
}

class InputRange extends Component {
  static defaultProps = {
    step: 1
  }

  constructor(props) {
    super(props)

    this.state = {
      value: getValue(this.props),
      showMinMax: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: getValue(nextProps)
      })
    }
  }

  onChange(e) {
    const val = e.currentTarget.value
    let newVal = val ? parseInt(e.currentTarget.value, 10) : ''
    if (newVal < this.props.min || newVal > this.props.max) {
      newVal = this.state.value
    }
    this.setState({
      value: newVal,
      showMinMax: true
    })

    this.props.onChange(e)
  }

  onBlur() {
    this.setState({
      showMinMax: false
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value || nextState.showMinMax !== this.state.showMinMax
  }

  render() {
    return (
      <div className="rka-input-range-container clearfix">
        <Input
          name={this.props.name}
          className="rka-input-range"
          type="range"
          disabled={!this.props.onChange}
          onChange={e => this.onChange(e)}
          onBlur={e => this.onBlur(e)}
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step={this.props.step}
        />
        <p>
          <span className={cx('rka-input-range-min', { 'is-active': this.state.showMinMax })}>
            {this.props.min}
          </span>
          {this.props.onChange ? (
            <Input
              name={this.props.name}
              className="rka-input-txt rka-input-range-current txt-c"
              size={5}
              type="text"
              disabled={!this.props.onChange}
              onChange={e => this.onChange(e)}
              value={this.state.value}
            />
          ) : (
            <span
              className={cx('rka-input-range-current txt-bold', {
                'is-disabled': !this.props.onChange
              })}
            >
              {this.state.value}
            </span>
          )}

          <span className={cx('rka-input-range-max', { 'is-active': this.state.showMinMax })}>
            {this.props.max}
          </span>
        </p>
      </div>
    )
  }
}

InputRange.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.number,
  onChange: PropTypes.func
}

export default InputRange
