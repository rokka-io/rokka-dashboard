import React, { PureComponent, PropTypes } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { authRequired } from '../utils/auth'
import { createStack, refreshStacks, setAlert } from '../state'
import Operation from './operations'
import FormGroup from './forms/FormGroup'
import previewImage from './images/previewImage'
import Spinner from './Spinner'
import Alert from './Alert'
import rokka from '../rokka'
import Options from './Options'

function randomNumber (min, max) {
  return Math.random() * (max - min) + min
}

function generateRandomId () {
  const max = Math.random() * 10
  const min = Math.random() * 2

  return Date.now() + '-' + randomNumber(min, max)
}

function generateDefaultValuesStackOptions (options, stackOptions) {
  Object.keys(stackOptions).forEach((optionName) => {
    if (stackOptions[optionName].default !== undefined && options[optionName] === null) {
      options[optionName] = stackOptions[optionName].default
    }
  })
  return options
}

class NewStack extends PureComponent {
  constructor (props) {
    super(props)

    let options = {
      'png.compression_level': props.stack.name ? props.stack.options['png.compression_level'] : null,
      'jpg.quality': props.stack.name ? props.stack.options['jpg.quality'] : null,
      'interlacing.mode': props.stack.name ? props.stack.options['interlacing.mode'] : null
    }
    if (props.stackOptions) {
      options = generateDefaultValuesStackOptions(options, props.stackOptions)
    }

    if (props.stack.name) {
      props.stack.operations.forEach((operation, i) => {
        operation['id'] = i.toString()
        operation['errors'] = {}
      })
    }

    this.state = {
      name: props.stack.name || '',
      options: options,
      operations: props.stack.operations || [],
      operationErrors: {},
      error: null,
      activeOperation: 0,
      preview: {
        stack: null,
        imageLoading: false,
        updated: true,
        image: null,
        error: null
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeOptions = this.onChangeOptions.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.addOperation = this.addOperation.bind(this)
    this.removeOperation = this.removeOperation.bind(this)
    this.setActiveOperation = this.setActiveOperation.bind(this)
    this.onMoveOperation = this.onMoveOperation.bind(this)
    this.updatePreview = this.updatePreview.bind(this)
  }

  componentDidMount () {
    this.props.loadPreviewImage()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.previewImage && this.props.previewImage && nextProps.previewImage.hash !== this.props.previewImage.hash) {
      this.updatePreview(nextProps.previewImage)
    }
    if (nextProps.stackOptions !== null) {
      const options = generateDefaultValuesStackOptions(Object.assign({}, this.state.options), nextProps.stackOptions)

      this.setState({
        options: options
      })
    }
  }

  addOperation (e) {
    e ? e.preventDefault() : null

    this.setState({
      operations: [
        ...this.state.operations,
        {
          // react drag and drop requires a unique id which stays the same across reorders
          // otherwise when moving an operation from index 0 to 1, the element might need to be recreated
          // and react-dnd looses track of it.
          id: generateRandomId(),
          name: this.refs.operationsList.value,
          options: {},
          errors: {}
        }
      ],
      activeOperation: this.state.operations.length,
      preview: Object.assign({}, this.state.preview, {
        updated: false
      })
    })
  }

  onSubmit (e) {
    e.preventDefault()

    let updateOperationsState = false

    const operations = this.state.operations.map((operation) => {
      const required = this.props.operations[operation.name].required || []
      const addedOptions = Object.keys(operation.options)
      const missing = required.filter((field) => {
        const index = addedOptions.indexOf(field)
        return index === -1 || !operation.options[field].length
      })

      operation.errors = {}
      missing.forEach((field) => {
        operation.errors[field] = `${field} is required`
      })

      if (missing.length) {
        updateOperationsState = true
      }

      return operation
    })

    this.setState({
      operations: operations
    })
    if (updateOperationsState) {
      return
    }

    createStack(this.state.name, this.state.operations, this.state.options)
      .then(({ body }) => {
        return Promise.all([body, refreshStacks()])
      })
      .then(([result]) => {
        setAlert('success', `Stack ${result.name} created successfully.`, 2000)
        this.props.router.push(`/stacks/${result.name}`)
      })
      .catch((error) => {
        this.setState({
          error: error.error.error.message
        })
      })
  }

  onChange (idx, e) {
    const target = e.currentTarget
    let value = target.value
    const name = target.name
    let operation = this.state.operations[idx]

    const operationDefinition = this.props.operations[operation.name]

    if (operationDefinition && operationDefinition.properties[name].type === 'bool') {
      value = value === 'true'
    }

    operation = Object.assign({}, operation, {
      options: Object.assign({}, operation.options, {
        [name]: value
      })
    })
    const operations = [
      ...this.state.operations.slice(0, idx),
      operation,
      ...this.state.operations.slice(idx + 1)
    ]

    this.setState({ operations, preview: Object.assign({}, this.state.preview, { updated: false }) })
  }

  onChangeName (e) {
    this.setState({
      name: e.currentTarget.value
    })
  }

  onChangeOptions (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      options: Object.assign({}, this.state.options, {
        [name]: value
      })
    })
  }

  onMoveOperation (dragIndex, hoverIndex) {
    let { operations, activeOperation } = this.state
    const dragOperation = operations[dragIndex]
    const hoverOperation = operations[hoverIndex]

    if (activeOperation === dragIndex) {
      activeOperation = hoverIndex
    } else if (activeOperation === hoverIndex) {
      activeOperation = dragIndex
    }

    operations[dragIndex] = hoverOperation
    operations[hoverIndex] = dragOperation

    this.setState({
      operations: [...operations],
      activeOperation: activeOperation,
      preview: Object.assign({}, this.state.preview, { updated: false })
    })
  }

  removeOperation (e, index) {
    e.preventDefault()

    const operations = [
      ...this.state.operations.slice(0, index),
      ...this.state.operations.slice(index + 1)
    ]
    this.setState({ operations, preview: Object.assign({}, this.state.preview, { updated: false }) })
  }

  setActiveOperation (e, index) {
    e.preventDefault()

    this.setState({
      activeOperation: index
    })
  }

  updatePreview (previewImage = null) {
    if (!previewImage) {
      return
    }

    const image = new window.Image()
    image.src = rokka.render.getUrl(this.props.auth.organization, previewImage.hash, previewImage.format, this.state.operations)
    image.onload = () => {
      this.setState({
        preview: Object.assign({}, this.state.preview, {
          imageLoading: false
        })
      })
    }
    image.onerror = () => {
      this.setState({
        preview: Object.assign({}, this.state.preview, {
          error: 'Invalid combination of image parameters.',
          imageLoading: false
        })
      })
    }

    this.setState({
      preview: Object.assign({}, this.state.preview, {
        image,
        imageLoading: true,
        updated: true,
        error: null
      })
    })
  }

  render () {
    const error = this.state.error ? <div className="rka-alert is-error mb-lg">{this.state.error}</div> : null

    let $previewButton = null
    if (this.props.previewImage) {
      $previewButton = (
        <button
          type="button"
          href="#"
          onClick={(e) => { e.preventDefault(); this.updatePreview(this.props.previewImage) }}
          disabled={this.state.preview.updated}
          className="rka-button rka-button-secondary mr-md">
          Update preview
        </button>
      )
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div className="bg-white pa-md clearfix">
          <h1 className="rka-h1 flo-l mt-xs">New stack</h1>
          <div className="flo-r">
            {$previewButton}
            <input
              type="submit"
              disabled={this.state.name === '' || !this.state.operations.length}
              className="rka-button rka-button-brand"
              value="Create stack"
            />
          </div>
        </div>
        <section className="rka-box rka-box-stacks pt-n">
          {error}
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <h3 className="rka-h2 mv-md">Stack details</h3>
              <FormGroup label="Name" required>
                <input type="text" className="rka-input-txt" id="name" name="name" onChange={this.onChangeName}
                  value={this.state.name} />
              </FormGroup>

              <Options defaultOptions={this.props.stackOptions || {}} options={this.state.options} onChange={this.onChangeOptions} />

              <h3 className="rka-h2 mv-md">Operations</h3>
              {this.state.operations.map((operation, index) => {
                return <Operation
                  availableOperations={this.props.operations}
                  key={`operation-${operation.id}-${operation.name}`}
                  operation={operation}
                  index={index}
                  isActive={index === this.state.activeOperation}
                  onChange={this.onChange}
                  removeOperation={this.removeOperation}
                  setActiveOperation={this.setActiveOperation}
                  onMoveOperation={this.onMoveOperation}
                />
              })}

              <div className="pa-md bor-light mt-md">
                <h3 className="rka-h3 mb-md">New operation</h3>
                <div className="rka-form-group">
                  <select ref="operationsList" className="rka-select">
                    {Object.keys(this.props.operations).map((name) => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>
                <a href="#" className="rka-button rka-button-brand rka-button-sm" onClick={this.addOperation}>Add operation</a>
              </div>
            </div>
            {this.renderPreviewSidebar()}
          </div>
        </section>
      </form>
    )
  }

  renderPreviewSidebar () {
    const { previewImage } = this.props
    if (!previewImage) {
      return null
    }

    const { organization } = this.props.auth
    const previewImages = {
      original: rokka.render.getUrl(organization, previewImage.hash, previewImage.format),
      dynamic: this.state.preview.image
        ? this.state.preview.image.src
        : rokka.render.getUrl(organization, previewImage.hash, previewImage.format)
    }

    return (
      <div className="col-md-5 col-sm-5">
        <h3 className="rka-h2 mv-md">
          Preview
          <a href="#" onClick={this.props.onOpenChoosePreviewImage} className="rka-link flo-r txt-sm">
            Change picture
          </a>
        </h3>
        <div className="rka-stack-img-container bg-chess mb-xs bor-light txt-c">
          <p className="pa-md bg-white txt-l">
            Customized <a href={previewImages.dynamic} className="rka-link flo-r" target="_blank">Open in new window</a>
          </p>
          { this.state.preview.error ? <Alert alert={{ type: 'error', message: this.state.preview.error }} /> : null }
          { this.state.preview.imageLoading ? <Spinner /> : <img src={previewImages.dynamic} /> }
        </div>
        <div className="rka-stack-img-container bg-chess bor-light txt-c">
          <p className="pa-md bg-white txt-l">
            Original <a href={previewImages.original} className="rka-link flo-r" target="_blank">Open in new window</a>
          </p>
          <img src={previewImages.original} />
        </div>
      </div>
    )
  }
}
NewStack.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  stack: PropTypes.object,
  operations: PropTypes.object.isRequired,
  stackOptions: PropTypes.object,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  // from previewImage
  onOpenChoosePreviewImage: PropTypes.func.isRequired,
  loadPreviewImage: PropTypes.func.isRequired,
  previewImage: PropTypes.object
}

export default authRequired(DragDropContext(HTML5Backend)(previewImage(NewStack)))
