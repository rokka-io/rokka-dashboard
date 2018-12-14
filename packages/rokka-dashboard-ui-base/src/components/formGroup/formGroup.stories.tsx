import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Input } from '../../elements';
import { FormGroup } from './formGroup';

storiesOf('Components / Forms', module).add('FormGroup', () => (
  <FormGroup label="Label for input">
    <Input placeholder={text('placeholder', 'A placeholder')} />
  </FormGroup>
));
