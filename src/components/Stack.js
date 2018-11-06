import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import cx from 'classnames'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { authRequired } from '../utils/auth'
import Modal from './Modal'
import previewImage from './images/previewImage'
import factory from './operations/factory'
import { cloneStack, deleteStack, setAlert } from '../state'
import Options from './Options'
import PreviewSidebar from './newStack/PreviewSidebar'
import Spinner from './Spinner'
import Alert from './Alert'

class Stack extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      confirmDeleteStack: false
    }
  }

  /**
   * Get current stack based on available stacks and URL.
   *
   * @returns {null|{}|bool}
   */
  getCurrentStack() {
    const { stacks, router } = this.props
    const { items } = stacks
    const {
      match: {
        params: { name }
      }
    } = router

    if (!items) {
      return null
    }

    for (const stack of items) {
      if (stack.name === name) {
        return stack
      }
    }
    return false
  }

  componentDidUpdate() {
    this.props.loadPreviewImage()
  }

  onClickDeleteStack() {
    this.setState({
      confirmDeleteStack: true
    })
  }

  onCancelDeleteStack() {
    this.setState({
      confirmDeleteStack: false
    })
  }

  onConfirmDeleteStack() {
    const { name } = this.getCurrentStack()

    deleteStack(name)
      .then(() => {
        this.props.router.history.push(`/stacks`)
        setAlert('success', `Stack ${name} has been deleted.`, 5000)
      })
      .catch(err => {
        console.error(err)

        this.onCancelDeleteStack()
        setAlert('error', `Error deleting stack ${name}`, 5000)
      })
  }

  onClickDuplicateStack() {
    const stack = this.getCurrentStack()
    const name = stack.name + '_copy'
    cloneStack(name, stack.stack_operations, stack.stack_options)
    this.props.router.history.push(`/new-stack`)
  }

  render() {
    const { previewImage = null, stacks, operations, router, auth } = this.props
    const {
      match: {
        params: { name }
      }
    } = router
    const { organization } = auth

    if (!stacks.items || !operations) {
      return (
        <div className="bg-white pa-md">
          <Spinner />
        </div>
      )
    }

    const stack = this.getCurrentStack()
    if (stack === null) {
      return null
    } else if (stack === false) {
      return (
        <div className="bg-white pa-md">
          <Alert alert={{ type: 'error', message: `Stack ${name} not found.` }} />
        </div>
      )
    }

    const { stackOptions } = this.props
    const addedOptions = stack.stack_options
    const availableOptions = stackOptions ? stackOptions.properties : {}

    let $options = null
    if (addedOptions) {
      const addedOptionsKeys = Object.keys(addedOptions)
      const options = addedOptionsKeys.reduce((accumulator, key) => {
        accumulator[key] = { value: addedOptions[key] }
        return accumulator
      }, {})
      const defaultOptions = Object.keys(availableOptions)
        .filter(key => !addedOptionsKeys.includes(key))
        .reduce((accumulator, key) => {
          accumulator[key] = { value: availableOptions[key].default }
          return accumulator
        }, {})

      $options = (
        <TabPanel>
          <Options options={options} defaultOptions={availableOptions} />
          <Options
            title={'Default options'}
            options={defaultOptions}
            defaultOptions={availableOptions}
          />
        </TabPanel>
      )
    }

    const { stack_operations: stackOperations = null } = stack
    let $operations = null
    if (stackOperations) {
      $operations = (
        <TabPanel>
          <h3 className="rka-h2 mv-md">Operations</h3>
          {stack.stack_operations.map((operation, index) => {
            return (
              <div
                className={cx('pa-md', 'bor-light', 'mb-xs', { 'bg-gray-lightest': index % 2 })}
                key={`${stack.name}-operation-${operation.name}-${index}`}
              >
                <h3 className="rka-h3 mb-md">{operation.name}</h3>
                {factory(operations, operation.name, operation.options)}
              </div>
            )
          })}
        </TabPanel>
      )
    }

    let $confirmDeleteModal = null
    if (this.state.confirmDeleteStack) {
      $confirmDeleteModal = (
        <Modal onClose={() => this.onCancelDeleteStack()}>
          <h2 className="rka-h1">Do you really want to delete this stack?</h2>
          <p className="mt-lg mb-md txt-md lh-lg">
            Please confirm whether your stack
            <span className="txt-bold"> {stack.name}</span> should be deleted. This is an operation
            that cannot be undone.
          </p>
          <button
            className="rka-button rka-button-negative mr-md mt-md"
            onClick={() => this.onConfirmDeleteStack()}
          >
            Yes, delete this stack
          </button>
          <button
            className="rka-button rka-button-secondary mt-md"
            onClick={() => this.onCancelDeleteStack()}
          >
            Cancel
          </button>
        </Modal>
      )
    }

    let $previewSidebar = null
    if (previewImage) {
      $previewSidebar = (
        <PreviewSidebar
          organization={organization}
          onChange={this.props.onOpenChoosePreviewImage}
          previewImage={previewImage}
          stack={stack.name}
        />
      )
    }

    return (
      <Fragment>
        <div className="bg-white pa-md clearfix">
          <h1 className="rka-h1 flo-l mt-xs">{stack.name}</h1>
          <div className="flo-r">
            <button
              className="rka-button rka-button-brand"
              onClick={e => this.onClickDuplicateStack(e)}
            >
              Clone stack
            </button>
          </div>
        </div>
        <div className="rka-box rka-box-stacks pt-n">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <form>
                <Tabs>
                  <TabList>
                    {$operations !== null && <Tab>Operations</Tab>}
                    {$options !== null && <Tab>Options</Tab>}
                  </TabList>
                  {$operations}
                  {$options}
                </Tabs>
              </form>
              <div className="mt-lg">
                <button
                  className="rka-button rka-button-negative"
                  onClick={e => this.onClickDeleteStack(e)}
                >
                  Delete stack
                </button>
              </div>
            </div>
            {$previewSidebar}
          </div>
        </div>
        {$confirmDeleteModal}
      </Fragment>
    )
  }
}

Stack.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  stackOptions: PropTypes.object,
  operations: PropTypes.object,
  stacks: PropTypes.shape({
    currentOffset: PropTypes.number,
    items: PropTypes.array,
    total: PropTypes.number
  }),
  router: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string
      }).isRequired
    }),
    history: PropTypes.shape({
      replace: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired
    })
  }).isRequired,
  // from previewImage
  onOpenChoosePreviewImage: PropTypes.func.isRequired,
  loadPreviewImage: PropTypes.func.isRequired,
  previewImage: PropTypes.object
}

export default authRequired(previewImage(Stack))
