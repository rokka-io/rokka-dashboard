import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { styles } from './forms/ReactSelect'
import FormGroup from './forms/FormGroup'
import StackOption from './options/StackOption'

class Options extends Component {
  static defaultProps = {
    title: 'Options'
  }

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }
  }

  onChange = (option, action) => {
    this.props.onChange(option)
    if (action === 'select-option') {
      this.setState({ value: '' })
    }
  }

  render() {
    const { defaultOptions, options, onChange, stacks, title } = this.props
    if (!Object.keys(defaultOptions).length) {
      return null
    }

    const addedOptions = Object.keys(options)
    let $options = 'No options added, default options apply.'
    if (addedOptions.length) {
      $options = addedOptions.reverse().map(name => (
        <div className="row" key={name}>
          <div className="col-md-12">
            <StackOption
              stacks={stacks}
              defaultOptions={defaultOptions}
              name={name}
              options={options}
              onChange={onChange}
            />
          </div>
        </div>
      ))
    }

    let $addOption = null
    if (onChange) {
      const availableOptions = Object.keys(defaultOptions)
        .filter(name => !addedOptions.includes(name))
        .map(name => ({
          value: defaultOptions[name].default,
          name,
          label: name
        }))
      $addOption = (
        <FormGroup label="Add stack option">
          <Select
            placeholder="Select stack option to add..."
            onChange={this.onChange}
            options={availableOptions}
            styles={styles}
            value={this.state.value}
          />
        </FormGroup>
      )
    }

    return (
      <Fragment>
        <h3 className="rka-h2 mv-md">{title}</h3>
        <div className="bg-gray-lightest pa-md bor-light">
          {$addOption}
          {$options}
        </div>
      </Fragment>
    )
  }
}

Options.propTypes = {
  defaultOptions: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  stacks: PropTypes.object,
  onChange: PropTypes.func,
  title: PropTypes.string
}

export default Options
