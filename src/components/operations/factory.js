import deepAssign from 'deep-assign'
import React, { createElement } from 'react'
import Alpha from './Alpha'
import AutoRotate from './AutoRotate'
import Blur from './Blur'
import Composition from './Composition'
import Crop from './Crop'
import Dropshadow from './Dropshadow'
import Grayscale from './Grayscale'
import Noop from './Noop'
import Primitive from './Primitive'
import Resize from './Resize'
import Rotate from './Rotate'
import Sepia from './Sepia'
import Trim from './Trim'

const operations = {
  alpha: Alpha,
  autorotate: AutoRotate,
  blur: Blur,
  composition: Composition,
  crop: Crop,
  dropshadow: Dropshadow,
  grayscale: Grayscale,
  noop: Noop,
  primitive: Primitive,
  resize: Resize,
  rotate: Rotate,
  sepia: Sepia,
  trim: Trim
}

const defaults = {
  resize: {
    upscale: {
      values: ['true', 'false']
    },
    upscale_dpr: {
      values: ['true', 'false']
    }
  },
  rotate: {
    angle: {
      default: 0
    }
  },
  dropshadow: {
    blur_radius: {
      maximum: 10000
    }
  }
}

/**
 * Creates the correct component based on the name. E.g. resize => Resize component.
 *
 * @param {object}   availableOperations
 * @param {string}   name
 * @param {*}        values
 * @param {Function} onChange
 * @param {Object}    errors
 */
export default function (availableOperations, name, values, onChange = null, errors = {}) {
  if (operations[name]) {
    const props = {
      defaults: deepAssign(availableOperations[name].properties, defaults[name]),
      required: availableOperations[name].required || [],
      values,
      onChange,
      errors: errors
    }

    return createElement(operations[name], props)
  }

  const issueSearch = encodeURIComponent(`is:issue ${name}`)

  return (
    <div className="row">
      <div className="rka-alert is-info">
        Stack operation <span className="txt-bold">{name}</span> not implemented yet in rokka-dashboard.
        {' '}
        <a className="rka-link txt-white" target="_blank" href={`https://github.com/rokka-io/rokka-dashboard/issues?q=${issueSearch}`}>File an issue on GitHub</a>
      </div>
    </div>
  )
}
