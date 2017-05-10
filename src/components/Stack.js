import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import { authRequired } from '../utils/auth'

import Modal from './Modal'
import previewImage from './images/previewImage'

import factory from './operations/factory'
import rokka from '../rokka'
import { deleteStack, setAlert } from '../state'
import Options from './Options'

const getStackByName = (stacks, name) => {
  let result

  if (!stacks) {
    return null
  }

  stacks.some((stack) => {
    if (stack.name === name) {
      result = stack
      return true
    }
  })

  return result
}

class Stack extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stack: getStackByName(props.stacks.items, props.params.name)
    }
  }

  componentDidMount () {
    // only load preview if there's a stack
    this.state.stack && this.props.loadPreviewImage()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      stack: getStackByName(nextProps.stacks.items, nextProps.params.name)
    })
  }

  componentWillMount () {
    if (!this.props.stacks.items) {
      this.props.router.replace({
        pathname: '/stacks'
      })
    }
  }

  onClickDeleteStack () {
    this.setState({
      confirmDeleteStack: true
    })
  }

  onCancelDeleteStack () {
    this.setState({
      confirmDeleteStack: false
    })
  }

  onConfirmDeleteStack () {
    const { name } = this.state.stack

    deleteStack(name)
      .then(() => {
        this.props.router.push(`/stacks`)
        setAlert('success', `Stack ${name} has been deleted.`, 5000)
      })
      .catch((err) => {
        console.error(err)

        this.onCancelDeleteStack()
        setAlert('error', `Error deleting stack ${name}`, 5000)
      })
  }

  render () {
    if (!this.state.stack) {
      return null
    }

    const { previewImage = null } = this.props
    const { organization } = this.props.auth

    let previewImages = {}
    if (previewImage) {
      previewImages = {
        original: rokka.render.getUrl(organization, previewImage.hash, previewImage.format),
        dynamic: rokka.render.getUrl(organization, previewImage.hash, previewImage.format, this.state.stack.name)
      }
    }

    const options = this.state.stack.stack_options

    let $options = null
    if (options) {
      $options = (
        <Options options={options} defaultOptions={this.props.stackOptions || {}} />
      )
    }

    let $confirmDeleteModal = null
    if (this.state.confirmDeleteStack) {
      $confirmDeleteModal = (
        <Modal onClose={() => this.onCancelDeleteStack()}>
          <h2 className="rka-h1">Do you really want to delete this stack?</h2>
          <p className="mt-lg mb-md txt-md lh-lg">
            Please confirm whether your stack
            <span className="txt-bold"> {this.state.stack.name}</span> should be deleted.
            This is an operation that cannot be undone.
          </p>
          <button className="rka-button rka-button-negative mr-md mt-md" onClick={() => this.onConfirmDeleteStack()}>
            Yes, delete this stack
          </button>
          <button className="rka-button rka-button-secondary mt-md" onClick={() => this.onCancelDeleteStack()}>
            Cancel
          </button>
        </Modal>
      )
    }

    let $previewSidebar = null
    if (previewImage) {
      $previewSidebar = (
        <div className="col-md-5 col-sm-5">
          <h3 className="rka-h2 mv-md">
            Preview
            <a href="#" className="rka-link flo-r txt-sm" onClick={this.props.onOpenChoosePreviewImage}>
              Change picture
            </a>
          </h3>
          <div className="rka-stack-img-container bg-chess mb-xs bor-light txt-c">
            <p className="pa-md bg-white txt-l">
              Customized <a href={previewImages.dynamic} className="rka-link flo-r" target="_blank">Open in new window</a>
            </p>
            <img src={previewImages.dynamic} />
          </div>
          <div className="rka-stack-img-container bg-chess mb-xs bor-light txt-c">
            <p className="pa-md bg-white txt-l">
              Original <a href={previewImages.original} className="rka-link flo-r" target="_blank">Open in new window</a>
            </p>
            <img src={previewImages.original} />
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="bg-white pa-md">
          <h1 className="rka-h1">{this.state.stack.name}</h1>
        </div>
        <div className="rka-box rka-box-stacks pt-n">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <form>
                {$options}
                <h3 className="rka-h2 mv-md">Operations</h3>
                {this.state.stack.stack_operations.map((operation, index) => {
                  return (
                    <div className={cx('pa-md', 'bor-light', 'mb-xs', {'bg-gray-lightest': index % 2})}
                      key={`${this.state.stack.name}-operation-${operation.name}-${index}`}>
                      <h3 className="rka-h3 mb-md">{operation.name}</h3>
                      {factory(this.props.operations, operation.name, operation.options)}
                    </div>
                  )
                })}
              </form>
              <div className="mt-lg">
                <button className="rka-button rka-button-negative" onClick={(e) => this.onClickDeleteStack(e)}>
                  Delete stack
                </button>
              </div>
            </div>
            {$previewSidebar}
          </div>
        </div>
        {$confirmDeleteModal}
      </div>
    )
  }
}

Stack.propTypes = {
  auth: PropTypes.shape({
    organization: PropTypes.string.isRequired
  }).isRequired,
  stackOptions: PropTypes.object.isRequired,
  operations: PropTypes.object,
  stacks: PropTypes.shape({
    currentOffset: PropTypes.number,
    items: PropTypes.array,
    total: PropTypes.number
  }),
  params: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  router: PropTypes.object.isRequired,
  // from previewImage
  onOpenChoosePreviewImage: PropTypes.func.isRequired,
  loadPreviewImage: PropTypes.func.isRequired,
  previewImage: PropTypes.object
}

export default authRequired(previewImage(Stack))
