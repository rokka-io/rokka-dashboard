import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import cx from 'classnames'
import { authRequired } from '../utils/auth'
import {
  resetStackClone,
  createStack,
  refreshStacks,
  setAlert,
  createStackByConfig,
  generateRandomId
} from '../state'
import previewImage from './images/previewImage'
import { getRenderUrl } from '../rokka'
import Ajv from 'ajv'
import PreviewSidebar from './stack/PreviewSidebar'
import Header from './stack/Header'
import BaseLayout from './layouts/BaseLayout'
import StackDetailPane from './stack/StackDetailPane'
import Spinner from './Spinner'
import { debounce } from 'lodash'
import Modal from './Modal'

const ajv = new Ajv({
  allErrors: true
})

function getStackOperations(stack) {
  if (!stack.operations || !Array.isArray(stack.operations)) {
    return []
  }
  return stack.operations
}

export const ROKKA_DASHBOARD_LAST_STACK = 'rokka-dashboard-laststack'

export function setStackToStorage(stack) {
  window.sessionStorage.setItem(ROKKA_DASHBOARD_LAST_STACK, JSON.stringify(stack))
}

export function removeStackFromStorage() {
  window.sessionStorage.removeItem(ROKKA_DASHBOARD_LAST_STACK)
}

function getStackFromStorage() {
  return JSON.parse(window.sessionStorage.getItem(ROKKA_DASHBOARD_LAST_STACK) || '{}')
}

export class NewStack extends PureComponent {
  constructor(props) {
    super(props)

    let { stackClone = {} } = props
    if (Object.keys(stackClone).length === 0) {
      stackClone = getStackFromStorage()
    }
    if (!stackClone.operations) {
      stackClone.operations = []
    }
    if (!stackClone.options) {
      stackClone.options = {}
    }

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
      stack: stackClone,
      operationErrors: {},
      error: null,
      activeOperation: 0,
      showLoader: false,
      confirmOverride: false, // State
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
    this.setStack = this.setStack.bind(this)
    this.onKeypress = this.onKeypress.bind(this)
  }

  componentDidMount() {
    resetStackClone()
    this.props.loadPreviewImage()
    window.addEventListener('keypress', this.onKeypress)
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.onKeypress)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.previewImage || prevProps.previewImage.hash !== this.props.previewImage.hash) {
      this.updatePreview(this.props.previewImage)
    }
  }

  onKeypress(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
      this.updatePreview(this.props.previewImage)
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.operations && !state.selectedOperation) {
      return {
        selectedOperation: Object.keys(props.operations).find(op => op === 'resize')
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

    const stack = { ...this.state.stack }
    stack.operations = getStackOperations(stack)
    stack.operations.push({
      // react drag and drop requires a unique id which stays the same across reorders
      // otherwise when moving an operation from index 0 to 1, the element might need to be recreated
      // and react-dnd looses track of it.
      id: generateRandomId(),
      name: this.state.selectedOperation,
      options: {},
      errors: {}
    })
    this.debouncePreview()

    this.setState({
      stack,
      activeOperation: stack.operations.length - 1,
      preview: Object.assign({}, this.state.preview, {
        updated: false
      })
    })
  }

  _updatePreviewAfterDebounce() {
    this.updatePreview(this.props.previewImage)
  }
  debouncePreview = debounce(this._updatePreviewAfterDebounce, 300)

  setStack(stack) {
    if (!stack.operations) {
      stack.operations = []
    }

    if (!stack.options) {
      stack.options = {}
    }
    setStackToStorage(stack)
    this.setState({
      stack: { ...stack },
      activeOperation: stack.operations.length - 1,
      preview: { ...this.state.preview, updated: false }
    })

    this.debouncePreview()
  }

  onSelectAddOperation(e) {
    this.setState({
      selectedOperation: e.target.value
    })
  }

  onCancelOverrideStack() {
    this.setState({
      confirmOverride: false
    })
  }

  onOverrideStack() {
    // Overriding Stack
    this.onCreateStack(this.state.name, true)

    this.setState({
      confirmOverride: false
    })
  }

  getStackConfig(showLoader = true) {
    let updateOperationsState = false
    const errors = []

    const operationValidators = this.generateOperationValidators(this.props.operations)
    const operations = getStackOperations(this.state.stack)
      .filter(operation => operationValidators[operation.name])
      .map(operation => {
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
            if (!operation.errors) {
              operation.errors = {}
            }
            operation.errors[property] = e.message
            errors.push(`${property}: ${e.message}`)
          })
        }

        return operation
      })

    let options = {}
    Object.keys(this.state.stack.options).forEach(key => {
      const option = this.state.stack.options[key]
      if (key !== 'basestack' || (key === 'basestack' && option.value !== null)) {
        options[key] = option.value
      }
    })

    let updatedOptions = Object.assign({}, this.state.stack.options)
    const validator = ajv.compile(this.props.stackOptions || {})
    const valid = validator(options)
    if (!valid) {
      console.log('!valid', validator.errors)
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

    const stack = { ...this.state.stack }
    stack.operations = operations
    stack.options = updatedOptions
    this.setState({
      stack,
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

    return stack
  }

  onSubmit(e, preview = false) {
    e.preventDefault()
    this.onCreateStack(preview ? '_preview_rokka_dashboard' : this.state.name, preview)
  }

  onCreateStack(name, overwrite = false) {
    this.setState({ showLoader: true })

    const config = this.getStackConfig()

    createStack(name, config.operations, config.options, overwrite)
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
          confirmOverride: true, //new state
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
    const stackOperations = getStackOperations(this.state.stack)
    let operation = stackOperations[idx]

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

    const newOptions = { ...operation.options, [name]: value }
    stackOperations[idx] = { ...stackOperations[idx], options: newOptions }
    this.debouncePreview()

    this.setState({
      stack: { ...this.state.stack, operations: stackOperations },
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

    this.debouncePreview()
    this.setState({
      stack: {
        ...this.state.stack,
        options: { ...(this.state.stack.options || {}), [name]: value }
      }
    })
  }

  onMoveOperation(dragIndex, hoverIndex) {
    let { stack, activeOperation } = this.state
    const operations = getStackOperations(stack)
    const dragOperation = operations[dragIndex]
    const hoverOperation = operations[hoverIndex]

    if (activeOperation === dragIndex) {
      activeOperation = hoverIndex
    } else if (activeOperation === hoverIndex) {
      activeOperation = dragIndex
    }

    operations[dragIndex] = hoverOperation
    operations[hoverIndex] = dragOperation
    this.debouncePreview()
    this.setState({
      stack: { ...stack },
      activeOperation: activeOperation,
      preview: Object.assign({}, this.state.preview, { updated: false })
    })
  }

  onRemoveOperation(e, index) {
    e.preventDefault()
    let { stack } = this.state

    const operations = getStackOperations(stack)
    const newOperations = [...operations.slice(0, index), ...operations.slice(index + 1)]
    this.debouncePreview()
    this.setState({
      stack: { ...stack, operations: newOperations },
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
    this.setState({ preview: { imageLoading: true } })

    try {
      await createStackByConfig(
        '_preview_rokka_dashboard',
        {
          ...this.state.stack,
          description:
            'Created by the rokka Dashboard on ' + new Date() + '. Can be safely deleted.'
        },
        true
      )
    } catch (e) {
      this.setState({
        preview: Object.assign({}, this.state.preview, {
          error: e.error.error.message,
          imageLoading: false
        }),
        error: e.error.error.message
      })
      return
    }
    image.src = getRenderUrl(
      this.props.auth.organization,
      previewImage.hash,
      previewImage.format,
      '_preview_rokka_dashboard',
      { filename: 'preview_v' + new Date().getTime() }
    )
    image.onload = e => {
      this.setState({
        preview: Object.assign({}, this.state.preview, {
          imageLoading: false,
          error: null
        })
      })
    }
    image.onerror = () => {
      this.setState({
        preview: Object.assign({}, this.state.preview, {
          error: 'Something went wrong loading the preview',
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
      }),
      error: null
    })
  }

  render() {
    const { error, selectedOperation, preview, showLoader, name, activeOperation } = this.state
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

    let $confirmOverrideModal = null
    if (this.state.confirmOverride) {
      $confirmOverrideModal = (
        <Modal onClose={() => this.onCancelOverrideStack()}>
          <h2 className="rka-h1">Do you really want to override this stack?</h2>
          <p className="mt-lg mb-md txt-md lh-lg">
            Please confirm whether your stack should override the copy. This is an operation that
            cannot be undone.
          </p>
          <p className="warning">
            Please note: Add Note <br />
            Documentation: Add Documentation
          </p>
          <button
            className="rka-button rka-button-negative mr-md mt-md"
            onClick={() => this.onOverrideStack()} // new Function
          >
            Yes, override this stack
          </button>
          <button
            className="rka-button rka-button-secondary mt-md"
            onClick={() => this.onCancelOverrideStack()}
          >
            Cancel
          </button>
        </Modal>
      )
    }

    return (
      <BaseLayout {...this.props}>
        <div className="section">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.onSubmit}>
                <Header title="New stack">
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
                        options={this.state.stack.options}
                        stacks={stacks}
                        stack={this.state.stack}
                        onChangeName={this.onChangeName}
                        onChangeOperation={this.onChange}
                        onAddOperation={this.onAddOperation}
                        setStack={this.setStack}
                        onRemoveOperation={this.onRemoveOperation}
                        setActiveOperation={this.setActiveOperation}
                        onMoveOperation={this.onMoveOperation}
                        onSelectAddOperation={this.onSelectAddOperation}
                        activeOperation={activeOperation}
                        addedOperations={this.state.stack ? this.state.stack.operations : []}
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
                      error={error}
                      imageLoading={preview.imageLoading}
                    />
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
        {$confirmOverrideModal}
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
