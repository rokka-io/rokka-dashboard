import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'
import OperationList from './OperationList'
import renderer from 'react-test-renderer'

function wrapInTestContext(DecoratedComponent) {
  class TestContextContainer extends Component {
    render() {
      return <DecoratedComponent {...this.props} />
    }
  }

  return DragDropContext(TestBackend)(TestContextContainer)
}

test('OperationList does render with minimal props', () => {
  const failingFunc = () => {
    throw new Error('Should not be called')
  }
  const props = {
    name: '',
    options: {},
    stacks: {},
    onChangeName: failingFunc,
    onChangeOptions: failingFunc,
    onChangeOperation: failingFunc,
    addOperation: failingFunc,
    removeOperation: failingFunc,
    setActiveOperation: failingFunc,
    onMoveOperation: failingFunc,
    onSelectAddOperation: failingFunc,
    selectedOperation: ''
  }
  const component = renderer.create(<OperationList {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('OperationList does render with all props', () => {
  const failingFunc = () => {
    throw new Error('Should not be called')
  }
  const props = {
    name: '',
    options: {},
    onChangeName: failingFunc,
    onChangeOptions: failingFunc,
    onChangeOperation: failingFunc,
    onAddOperation: failingFunc,
    onRemoveOperation: failingFunc,
    setActiveOperation: failingFunc,
    onMoveOperation: failingFunc,
    onSelectAddOperation: failingFunc,
    selectedOperation: '',
    activeOperation: 1,
    availableOperations: {
      rotate: {
        properties: {
          angle: {
            minimum: 0,
            maximum: 360,
            default: 90
          },
          background_color: {
            default: '#000000'
          },
          background_opacity: {
            minimum: 0,
            maximum: 100
          }
        }
      },
      crop: {
        properties: {
          width: {
            minimum: 0,
            maximum: 10000
          },
          height: {
            minimum: 0,
            maximum: 10000
          },
          anchor: {
            default: 'left'
          }
        }
      }
    },
    addedOperations: [
      {
        id: '1',
        name: 'rotate',
        options: {},
        errors: {}
      },
      {
        id: '2',
        name: 'crop',
        options: {},
        errors: {}
      }
    ],
    stackOptions: {
      properties: {}
    }
  }
  const WrappedOperationList = wrapInTestContext(OperationList)
  const component = renderer.create(<WrappedOperationList {...props} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
