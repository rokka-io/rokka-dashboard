import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { authRequired } from '../utils/auth'
import Modal from './Modal'
import previewImage from './images/previewImage'
import { cloneStack, deleteStack, setAlert } from '../state'
import PreviewSidebar from './stack/PreviewSidebar'
import Spinner from './Spinner'
import Alert from './Alert'
import Header from './stack/Header'
import StackDetailPane from './stack/StackDetailPane'

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

    const { stackOptions, operations: availableOperations } = this.props
    const defaultOptions = stackOptions ? stackOptions.properties : {}
    const { stack_operations: addedOperations = [], stack_options: addedOptions = {} } = stack

    const addedOptionsKeys = Object.keys(addedOptions)
    const options = addedOptionsKeys.reduce((accumulator, key) => {
      accumulator[key] = { value: addedOptions[key] }
      return accumulator
    }, {})

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

    return (
      <Fragment>
        <Header title={stack.name} cloneStack={e => this.onClickDuplicateStack(e)}>
          <button
            className="rka-button rka-button-brand"
            onClick={e => this.onClickDuplicateStack(e)}
          >
            Clone stack
          </button>
        </Header>
        <div className="rka-box rka-box-stacks pt-n">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <StackDetailPane
                availableOperations={availableOperations}
                addedOperations={addedOperations}
                options={options}
                defaultOptions={defaultOptions}
                router={this.props.router}
                name={stack.name}
              />
              <div className="mt-lg">
                <button
                  className="rka-button rka-button-negative"
                  onClick={e => this.onClickDeleteStack(e)}
                >
                  Delete stack
                </button>
              </div>
            </div>
            <PreviewSidebar
              organization={organization}
              onChange={this.props.onOpenChoosePreviewImage}
              previewImage={previewImage}
              stack={stack.name}
            />
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
