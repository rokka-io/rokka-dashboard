import React from 'react'
import Alert from './Alert'
import renderer from 'react-test-renderer'

test('Alert does not render if no alert props given', () => {
  const component = renderer.create(<Alert />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Alert renders one alert', () => {
  const component = renderer.create(<Alert alert={{ type: 'error', message: 'Test alert' }} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Alert renders multiple alerts', () => {
  const component = renderer.create(
    <Alert alert={{ type: 'error', message: ['Test alert', 'Rokka yay'] }} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
