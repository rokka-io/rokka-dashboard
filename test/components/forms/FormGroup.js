import React from 'react'
import FormGroup from '../../../src/components/forms/FormGroup'
import renderer from 'react-test-renderer'

test('FormGroup does render', () => {
  const component = renderer.create(
    <FormGroup label="Test">
      <span>Test</span>
    </FormGroup>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('FormGroup does render with required indicator', () => {
  const component = renderer.create(
    <FormGroup label="Test" required>
      <span>Test</span>
    </FormGroup>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('FormGroup does render with className', () => {
  const component = renderer.create(
    <FormGroup label="Test" className="test">
      <span>Test</span>
    </FormGroup>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('FormGroup does render with error', () => {
  const component = renderer.create(
    <FormGroup label="Test" error="Test">
      <span>Test</span>
    </FormGroup>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
