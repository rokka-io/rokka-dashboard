import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Label } from './label';

storiesOf('Elements / Forms', module).add('Label', () => <Label>{text('text', 'A label')}</Label>);
