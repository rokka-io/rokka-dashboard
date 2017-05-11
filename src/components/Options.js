import React, { Component, PropTypes } from 'react'
import Compression from './options/Compression'
import Quality from './options/Quality'
import Interlacing from './options/Interlacing'
import BaseStack from './options/BaseStack'

class Options extends Component {
  render () {
    const { defaultOptions } = this.props
    if (!Object.keys(defaultOptions).length) {
      return null
    }

    return (
      <div>
        <h3 className="rka-h2 mv-md">Options</h3>
        <div className="bg-gray-lightest pa-md bor-light">
          <div className="row">
            <div className="col-md-6">
              <Compression value={this.props.options['png.compression_level']}
                min={defaultOptions['png.compression_level'].minimum}
                max={defaultOptions['png.compression_level'].maximum}
                onChange={this.props.onChange} />
            </div>
            <div className="col-md-6">
              <Quality value={this.props.options['jpg.quality']}
                min={defaultOptions['jpg.quality'].minimum}
                max={defaultOptions['jpg.quality'].maximum}
                onChange={this.props.onChange} />
            </div>
            <div className="col-md-12">
              <Interlacing value={this.props.options['interlacing.mode']}
                options={defaultOptions['interlacing.mode'].values}
                onChange={this.props.onChange} />
            </div>
            <div className="col-md-12">
              <BaseStack value={this.props.options['basestack']}
                onChange={this.props.onChange}
                stacks={this.props.stacks} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Options.propTypes = {
  defaultOptions: PropTypes.object.isRequired,
  options: PropTypes.shape({
    'png.compression_level': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'jpg.quality': PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    'interlacing.mode': PropTypes.string,
    'basestack': PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  stacks: PropTypes.object,
  onChange: PropTypes.func
}

export default Options
