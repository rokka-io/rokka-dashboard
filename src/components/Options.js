import React, { Component, PropTypes } from 'react'
import Compression from './options/Compression'
import Quality from './options/Quality'
import Interlacing from './options/Interlacing'

class Options extends Component {
  render () {
    const { defaultOptions } = this.props

    if (!Object.keys(defaultOptions).length) {
      return null
    }

    console.log(defaultOptions['interlacing.mode'])

    return (
      <div>
        <h3 className="rka-h2 mv-md">Options</h3>
        <div className="bg-gray-lightest pa-md bor-light">
          <div className="row">
            <div className="col-md-6">
              <Compression value={this.props.options['png.compression_level'] || defaultOptions['png.compression_level'].default}
                min={defaultOptions['png.compression_level'].minimum}
                max={defaultOptions['png.compression_level'].maximum}
                onChange={this.props.onChange} />
            </div>
            <div className="col-md-6">
              <Quality value={this.props.options['jpg.quality'] || defaultOptions['jpg.quality'].default}
                min={defaultOptions['jpg.quality'].minimum}
                max={defaultOptions['jpg.quality'].maximum}
                onChange={this.props.onChange} />
            </div>
            <div className="col-md-12">
              <Interlacing value={this.props.options['interlacing.mode'] || defaultOptions['interlacing.mode'].default}
                none={defaultOptions['jpg.quality'].form}
                line={defaultOptions['jpg.quality'].form}
                plane={defaultOptions['jpg.quality'].form}
                partition={defaultOptions['jpg.quality'].form}
                onChange={this.props.onChange} />
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
    'png.compression_level': PropTypes.string,
    'jpg.quality': PropTypes.string,
    'interlacing.mode': PropTypes.string
  }).isRequired,
  onChange: PropTypes.func
}

export default Options
