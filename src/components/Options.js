import React, { Component, PropTypes } from 'react'
import CompressionOption from './options/Compression'
import QualityOption from './options/Quality'
import InterlacingOption from './options/Interlacing'

class Options extends Component {
  render () {
    return (
      <div>
        <h3 className="rka-h2 mv-md">Options</h3>
        <div className="bg-gray-lightest pa-md bor-light">
          <div className="row">
            <div className="col-md-6">
              <CompressionOption value={this.props.options['png.compression_level']} onChange={this.props.onChange} />
            </div>
            <div className="col-md-6">
              <QualityOption value={this.props.options['jpg.quality']} onChange={this.props.onChange} />
            </div>
            <div className="col-md-12">
              <InterlacingOption value={this.props.options['interlacing.mode']} onChange={this.props.onChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Options.propTypes = {
  options: PropTypes.shape({
    'png.compression_level': PropTypes.string,
    'jpg.quality': PropTypes.string,
    'interlacing.mode': PropTypes.string
  }).isRequired,
  onChange: PropTypes.func
}

export default Options
