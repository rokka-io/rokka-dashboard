import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { LoadingIndicatingButton } from './loadingIndicatingButton';

storiesOf('Components / Forms', module).add('LoadingIndicatingButton', () => (
  <LoadingIndicatingButton onClick={action('Button Click')} loading={boolean('loading', true)}>
    {text('text', 'foobar')}
  </LoadingIndicatingButton>
));
