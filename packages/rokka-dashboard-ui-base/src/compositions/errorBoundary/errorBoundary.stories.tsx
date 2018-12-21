import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React, { FunctionComponent } from 'react';
import { ErrorBoundary } from './errorBoundary';

interface ErrorThrowingComponentProps {
  throwError?: boolean;
}

const ErrorThrowingComponent: FunctionComponent<ErrorThrowingComponentProps> = ({ throwError = false }) => {
  if (throwError) {
    throw new Error('I error always');
  }
  return <span>some text here</span>;
};

storiesOf('Compositions', module).add('ErrorBoundary', () => (
  <ErrorBoundary>
    <ErrorThrowingComponent throwError={boolean('throw error', false)} />
  </ErrorBoundary>
));
