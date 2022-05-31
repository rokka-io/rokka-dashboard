import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import cx from 'classnames'
import { authRequired } from '../utils/auth'
import { resetStackClone, createStack, refreshStacks, setAlert } from '../state'
import previewImage from './images/previewImage'
import rokka from '../rokka'
import Ajv from 'ajv'
import PreviewSidebar from './stack/PreviewSidebar'
import Header from './stack/Header'
import BaseLayout from './layouts/BaseLayout'
import StackDetailPane from './stack/StackDetailPane'
import Spinner from './Spinner'

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

function generateRandomId() {
  const max = Math.random() * 10
  const min = Math.random() * 2

  return Date.now() + '-' + randomNumber(min, max)
}

const ajv = new Ajv({
  allErrors: true
})

export class NewStack extends PureComponent {
  constructor(props) {
    super(props)

    const { stackClone = {} } = props

    let options = {}
    if (stackClone.options) {
      options = Object.keys(stackClone.options).reduce((accumulator, key) => {
        accumulator[key] = { value: stackClone.options[key] }
        return accumulator
      }, {})
    }

    if (stackClone.operations) {
      stackClone.operations.forEach((operation, i) => {
        operation['id'] = i.toString()
        operation['errors'] = {}
      })
    }

    this.state = {
      name: stackClone.name || '',
      options: options,
      addedOperations: stackClone.operations || [],
      operationErrors: {},
      error: null,
      activeOperation: 0,
      showLoader: false,
      preview: {
        stack: null,
        imageLoading: false,
        updated: true,
        image: null,
        error: null
      },
      selectedOperation: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeOptions = this.onChangeOptions.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onAddOperation = this.onAddOperation.bind(this)
    this.onRemoveOperation = this.onRemoveOperation.bind(this)
    this.setActiveOperation = this.setActiveOperation.bind(this)
    this.onMoveOperation = this.onMoveOperation.bind(this)
    this.onSelectAddOperation = this.onSelectAddOperation.bind(this)
    this.updatePreview = this.updatePreview.bind(this)
  }

  componentDidMount() {
    resetStackClone()
    this.props.loadPreviewImage()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.previewImage || prevProps.previewImage.hash !== this.props.previewImage.hash) {
      this.updatePreview(this.props.previewImage)
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.operations && !state.selectedOperation) {
      return {
        selectedOperation: Object.keys(props.operations).sort()[0]
      }
    }
    return null
  }

  generateOperationValidators(operations) {
    const operationValidators = {}
    Object.keys(operations)
      .filter(key => key !== 'noop')
      .forEach(key => {
        const operation = operations[key]
        if (key === 'grayscale' && Array.isArray(operation.properties)) {
          operation.properties = {}
        }
        if (key === 'resize' && operation.oneOf && typeof operation.oneOf[0] === 'string') {
          delete operation.oneOf
        }
        operationValidators[key] = ajv.compile(operation)
      })
    return operationValidators
  }

  onAddOperation(e) {
    e && e.preventDefault()

    this.setState({
      addedOperations: [
        ...this.state.addedOperations,
        {
          // react drag and drop requires a unique id which stays the same across reorders
          // otherwise when moving an operation from index 0 to 1, the element might need to be recreated
          // and react-dnd looses track of it.
          id: generateRandomId(),
          name: this.state.selectedOperation,
          options: {},
          errors: {}
        }
      ],
      activeOperation: this.state.addedOperations.length,
      preview: Object.assign({}, this.state.preview, {
        updated: false
      })
    })
  }

  onSelectAddOperation(e) {
    this.setState({
      selectedOperation: e.target.value
    })
  }

  getStackConfig(showLoader = true) {
    let updateOperationsState = false
    const errors = []

    const operationValidators = this.generateOperationValidators(this.props.operations)
    const operations = this.state.addedOperations.map(operation => {
      const valid = operationValidators[operation.name](operation.options)
      if (!valid) {
        updateOperationsState = true

        operationValidators[operation.name].errors.forEach(e => {
          let property = null
          if (e.keyword === 'required') {
            property = e.params.missingProperty
          } else {
            property = e.dataPath.replace('.', '')
          }
          operation.errors[property] = e.message
          errors.push(`${property}: ${e.message}`)
        })
      }

      return operation
    })

    let options = {}
    Object.keys(this.state.options).forEach(key => {
      const option = this.state.options[key]
      if (key !== 'basestack' || (key === 'basestack' && option.value !== null)) {
        options[key] = option.value
      }
    })

    let updatedOptions = Object.assign({}, this.state.options)
    const validator = ajv.compile(this.props.stackOptions)
    const valid = validator(options)
    if (!valid) {
      updateOperationsState = true

      validator.errors.forEach(e => {
        let property = null
        if (e.keyword === 'required') {
          property = e.params.missingProperty
        } else if (e.dataPath.substring(0, 1) === '.') {
          property = e.dataPath.replace('.', '')
        } else if (e.dataPath.substring(0, 1) === '[') {
          property = e.dataPath.replace(/[['][^_]/g, '')
        }
        errors.push(`${property}: ${e.message}`)
        updatedOptions[property].error = e.message
      })
    }

    this.setState({
      addedOperations: operations,
      options: updatedOptions,
      // hide loader if updateOperationsState is true and we exit this function right after setState.
      showLoader: !updateOperationsState && showLoader,
      error: errors.length ? errors.join('. ') : null
    })
    if (updateOperationsState) {
      return
    }

    Object.keys(options).forEach(key => {
      const val = options[key]
      if (!val || val === this.props.stackOptions.properties[key].default) {
        delete options[key]
      }
    })

    return { options, operations }
  }

  onSubmit(e, preview = false) {
    e.preventDefault()
    this.setState({ showLoader: true })

    const config = this.getStackConfig()

    createStack(preview ? '_preview' : this.state.name, config.operations, config.options, preview)
      .then(({ body }) => {
        return Promise.all([body, refreshStacks()])
      })
      .then(([result]) => {
        setAlert('success', `Stack ${result.name} created successfully.`, 2000)
        this.setState({
          showLoader: false,
          hasError: false
        })
        this.props.router.history.push(`/stacks/${result.name}`)
      })
      .catch(error => {
        this.setState({
          showLoader: false,
          error: error.error.error.message
        })
      })
  }

  onChange(idx, eventOrValue) {
    let { currentTarget = null, name, value } = eventOrValue

    if (currentTarget) {
      value = currentTarget.type === 'checkbox' ? currentTarget.checked : currentTarget.value
      name = currentTarget.name
    }

    let operation = this.state.addedOperations[idx]

    const operationDefinition = this.props.operations[operation.name]

    if (operationDefinition && operationDefinition.properties[name].type === 'boolean') {
      value = value === true || value === 'true'
    } else if (operationDefinition && operationDefinition.properties[name].type === 'integer') {
      value = parseInt(value, 10)
      if (isNaN(value)) {
        value = ''
      }
    } else if (operationDefinition && operationDefinition.properties[name].type === 'number') {
      value = parseFloat(value)
      if (isNaN(value)) {
        value = ''
      }
    }

    operation = Object.assign({}, operation, {
      options: Object.assign({}, operation.options, {
        [name]: value
      })
    })
    const operations = [
      ...this.state.addedOperations.slice(0, idx),
      operation,
      ...this.state.addedOperations.slice(idx + 1)
    ]

    this.setState({
      addedOperations: operations,
      preview: Object.assign({}, this.state.preview, { updated: false })
    })
  }

  onChangeName(e) {
    this.setState({
      name: e.currentTarget.value
    })
  }

  /**
   * Triggered when stack options change.
   *
   * @param {Object|Event} eventOrOption If a change event is passed, name/value are retrieved from event.target.
   *                                     If an object with name and value is passed, those are used directly.
   */
  onChangeOptions(eventOrOption) {
    let { target = null, name, value } = eventOrOption
    if (target) {
      const target = eventOrOption.target
      value = target.type === 'checkbox' ? target.checked : target.value
      name = target.name
    }

    const { stackOptions } = this.props
    const typ = stackOptions.properties[name].type

    switch (typ) {
      case 'boolean':
        value = value === true || value === 'true'
        break
      case 'integer':
        value = parseInt(value, 10)
        break
      case 'number':
        value = parseFloat(value)
        break
      case 'array':
        if (value) {
          value = value.split(',')
        }
        break
      default:
      // keeps the original value
    }

    this.setState({
      options: Object.assign({}, this.state.options, {
        [name]: { value }
      })
    })
  }

  onMoveOperation(dragIndex, hoverIndex) {
    let { addedOperations, activeOperation } = this.state
    const dragOperation = addedOperations[dragIndex]
    const hoverOperation = addedOperations[hoverIndex]

    if (activeOperation === dragIndex) {
      activeOperation = hoverIndex
    } else if (activeOperation === hoverIndex) {
      activeOperation = dragIndex
    }

    addedOperations[dragIndex] = hoverOperation
    addedOperations[hoverIndex] = dragOperation

    this.setState({
      addedOperations: [...addedOperations],
      activeOperation: activeOperation,
      preview: Object.assign({}, this.state.preview, { updated: false })
    })
  }

  onRemoveOperation(e, index) {
    e.preventDefault()

    const addedOperations = [
      ...this.state.addedOperations.slice(0, index),
      ...this.state.addedOperations.slice(index + 1)
    ]
    this.setState({
      addedOperations,
      preview: Object.assign({}, this.state.preview, { updated: false })
    })
  }

  setActiveOperation(e, index) {
    e.preventDefault()

    this.setState({
      activeOperation: index
    })
  }

  async updatePreview(previewImage = null) {
    if (!previewImage) {
      return
    }

    const image = new window.Image()
    const stackConfig = this.getStackConfig(false)

    await createStack('_preview', stackConfig.operations, stackConfig.options, true)
    image.src = rokka().render.getUrl(
      this.props.auth.organization,
      previewImage.hash,
      previewImage.format,
      '_preview',
      { filename: 'preview_v' + new Date().getTime() }
    )
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

  render() {
    const {
      error,
      selectedOperation,
      preview,
      showLoader,
      name,
      options,
      activeOperation,
      addedOperations
    } = this.state
    const {
      previewImage,
      stacks,
      operations,
      stackOptions,
      auth,
      onOpenChoosePreviewImage
    } = this.props

    const $error = error ? <div className="rka-alert is-error mb-lg">{error}</div> : null

    if (!selectedOperation) {
      return null
    }

    return (
      <BaseLayout {...this.props}>
        <div className="section">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.onSubmit}>
                <Header title="New stack">
                  {previewImage && (
                    <button
                      type="button"
                      onClick={e => this.updatePreview(previewImage)}
                      disabled={preview.updated}
                      className="rka-button rka-button-secondary mr-md"
                    >
                      Update preview
                    </button>
                  )}
                  <button
                    className={cx('rka-button rka-button-brand', {
                      'disabled flo-r': showLoader || name === ''
                    })}
                    type="submit"
                  >
                    {showLoader ? (
                      <div className="sk-cube-small sk-cube-white">
                        <Spinner />
                      </div>
                    ) : (
                      'Create stack'
                    )}
                  </button>
                </Header>
                <section className="rka-box rka-box-stacks pt-n">
                  {$error}
                  <div className="row">
                    <div className="col-md-7 col-sm-7">
                      <StackDetailPane
                        name={name}
                        options={options}
                        stacks={stacks}
                        onChangeName={this.onChangeName}
                        onChangeOperation={this.onChange}
                        onAddOperation={this.onAddOperation}
                        onRemoveOperation={this.onRemoveOperation}
                        setActiveOperation={this.setActiveOperation}
                        onMoveOperation={this.onMoveOperation}
                        onSelectAddOperation={this.onSelectAddOperation}
                        activeOperation={activeOperation}
                        addedOperations={addedOperations}
                        availableOperations={operations}
                        defaultOptions={stackOptions ? stackOptions.properties : {}}
                        selectedOperation={selectedOperation}
                        onChangeOptions={this.onChangeOptions}
                        router={this.props.router}
                      />
                    </div>
                    <PreviewSidebar
                      organization={auth.organization}
                      previewImage={previewImage}
                      currentPreviewImage={preview.image}
                      onChange={onOpenChoosePreviewImage}
                      error={preview.error}
                      imageLoading={preview.imageLoading}
                    />
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}
NewStack.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  stackClone: PropTypes.object,
  operations: PropTypes.object.isRequired,
  stackOptions: PropTypes.object,
  stacks: PropTypes.object,
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }).isRequired,
  // from previewImage
  onOpenChoosePreviewImage: PropTypes.func.isRequired,
  loadPreviewImage: PropTypes.func.isRequired,
  previewImage: PropTypes.object
}

export default authRequired(DragDropContext(HTML5Backend)(previewImage(NewStack)))
