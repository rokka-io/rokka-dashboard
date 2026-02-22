import React from 'react'
import renderer from 'react-test-renderer'
import ErrorBoundary from './ErrorBoundary'

test('ErrorBoundary renders children when no error', () => {
  const component = renderer.create(
    <ErrorBoundary>
      <p>Everything is fine</p>
    </ErrorBoundary>,
  )
  expect(component.toJSON()).toMatchSnapshot()
})

test('ErrorBoundary renders fallback UI when child throws', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const ThrowingComponent = () => {
    throw new Error('Test error')
  }

  const component = renderer.create(
    <ErrorBoundary>
      <ThrowingComponent />
    </ErrorBoundary>,
  )
  expect(component.toJSON()).toMatchSnapshot()

  spy.mockRestore()
})
