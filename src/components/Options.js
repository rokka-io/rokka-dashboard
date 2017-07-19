import React, { Component, PropTypes } from 'react'
import Compression from './options/Compression'
import Interlacing from './options/Interlacing'
import BaseStack from './options/BaseStack'
import InputRange from './forms/InputRange'
import FormGroup from './forms/FormGroup'

class Options extends Component {
  render () {
    const { defaultOptions } = this.props
    if (!Object.keys(defaultOptions).length) {
      return null
    }
    console.log(this.props.options)
    return (
      <div>
        <h3 className="rka-h2 mv-md">Options</h3>
        <div className="bg-gray-lightest pa-md bor-light">
          <div className="row">
            <div className="col-md-6">
              <Compression value={this.props.options['png.compression_level'].value}
                min={defaultOptions['png.compression_level'].minimum}
                max={defaultOptions['png.compression_level'].maximum}
                onChange={this.props.onChange}
                error={this.props.options['png.compression_level'] ? this.props.options['png.compression_level'].error : null} />
            </div>
            <div className="col-md-6">
              <FormGroup label="JPG Image quality">
                <InputRange onChange={this.props.onChange}
                  min={defaultOptions['jpg.quality'].minimum} max={defaultOptions['jpg.quality'].maximum}
                  name="jpg.quality" value={this.props.options['jpg.quality'].value}
                  error={this.props.options['jpg.quality'] ? this.props.options['jpg.quality'].error : null}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup label="WebP Image quality">
                <InputRange onChange={this.props.onChange}
                  min={defaultOptions['webp.quality'].minimum} max={defaultOptions['webp.quality'].maximum}
                  name="webp.quality" value={this.props.options['webp.quality'].value}
                  error={this.props.options['webp.quality'] ? this.props.options['webp.quality'].error : null}
                />
              </FormGroup>
            </div>
            <div className="col-md-6">
              <Interlacing value={this.props.options['interlacing.mode'].value}
                options={defaultOptions['interlacing.mode'].values}
                onChange={this.props.onChange}
                error={this.props.options['interlacing.mode'] ? this.props.options['interlacing.mode'].error : null} />
            </div>
            <div className="col-md-12">
              <BaseStack value={this.props.options['basestack'] ? this.props.options['basestack'].value : null}
                onChange={this.props.onChange}
                stacks={this.props.stacks}
                error={this.props.options['basestack'] ? this.props.options['basestack'].error : null} />
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
    'png.compression_level': PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), error: PropTypes.string
    }),
    'jpg.quality': PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), error: PropTypes.string
    }),
    'webp.quality': PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), error: PropTypes.string
    }),
    'interlacing.mode': PropTypes.shape({value: PropTypes.string, error: PropTypes.string}),
    'basestack': PropTypes.shape({value: PropTypes.string, error: PropTypes.string})
  }).isRequired,
  stacks: PropTypes.object,
  onChange: PropTypes.func
}

export default Options
