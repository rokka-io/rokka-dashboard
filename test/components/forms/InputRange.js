import React from 'react'
import InputRange from '../../../src/components/forms/InputRange'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

test('InputRange does render', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange does render with onChange', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} onChange={() => {}} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange does render with a number value', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} value={12} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange does render with a string value', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} value="12" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange does render with a number defaultValue', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} defaultValue={12} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange does render with a string defaultValue', () => {
  const component = renderer.create(
    <InputRange name="Test" min={0} max={100} defaultValue="12" />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('InputRange onChange', (done) => {
  const onChange = (e) => {
    expect(e.currentTarget.value).toBe('15')

    done()
  }
  const component = shallow(
    <InputRange name="Test" min={0} max={100} defaultValue="12" onChange={onChange} />
  )

  component.find('Input.rka-input-range').simulate('change', {currentTarget: {value: '15'}})
})

test('InputRange onChange in manual input', (done) => {
  const onChange = (e) => {
    expect(e.currentTarget.value).toBe('15')

    done()
  }
  const component = shallow(
    <InputRange name="Test" min={0} max={100} defaultValue="12" onChange={onChange} />
  )

  component.find('Input.rka-input-txt').simulate('change', {currentTarget: {value: '15'}})
})

test('InputRange is-active on min/max values', (done) => {
  const onChange = (e) => {
    expect(e.currentTarget.value).toBe('15')

    done()
  }
  const component = shallow(
    <InputRange name="Test" min={0} max={100} defaultValue="12" onChange={onChange} />
  )

  expect(component.find('.rka-input-range-min').node.props.className.indexOf('is-active')).toBe(-1)
  expect(component.find('.rka-input-range-max').node.props.className.indexOf('is-active')).toBe(-1)

  component.find('Input.rka-input-range').simulate('change', {currentTarget: {value: '15'}})

  expect(component.find('.rka-input-range-min').node.props.className.indexOf('is-active')).toBeGreaterThan(-1)
  expect(component.find('.rka-input-range-max').node.props.className.indexOf('is-active')).toBeGreaterThan(-1)

  component.find('Input.rka-input-range').simulate('blur')

  expect(component.find('.rka-input-range-min').node.props.className.indexOf('is-active')).toBe(-1)
  expect(component.find('.rka-input-range-max').node.props.className.indexOf('is-active')).toBe(-1)
})
