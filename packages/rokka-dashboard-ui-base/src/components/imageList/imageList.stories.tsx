import { storiesOf } from '@storybook/react';
import React from 'react';

import { ImageList } from './imageList';

storiesOf('Components / Images', module).add('List', () => 
  <ImageList title="Latest Images"/>
);
