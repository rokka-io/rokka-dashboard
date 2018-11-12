import React from 'react'
import InputColor from './InputColor'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

test('InputColor does render', () => {
  const component = renderer.create(<InputColor name="Test" />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.children[0].props.onClick()

  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputColor provides value', () => {
  const component = renderer.create(<InputColor name="Test" value="000000" />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.children[0].props.onClick()

  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputColor provides shows defaultValue', () => {
  const component = renderer.create(<InputColor name="Test" defaultValue="000000" />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.children[0].props.onClick()

  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputColor onChange', done => {
  const onChange = ({ name, value }) => {
    expect(name).toBe('Test')
    expect(value).toBe('000000')

    done()
  }
  const component = shallow(<InputColor name="Test" value="000000" onChange={onChange} />)

  component.find('input.rka-input-txt').simulate('click')

  component.find('ColorPicker').simulate('changeComplete', { hex: '#000000' })
})
