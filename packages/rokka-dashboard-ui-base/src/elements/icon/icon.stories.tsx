import { color, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { allIcons } from './icon';

const s = storiesOf('Elements / Icons', module).addDecorator(story => (
  <div style={{ background: colors.brand.dark, padding: spaces.medium }}>{story()}</div>
));

for (const iconName of Object.keys(allIcons)) {
  const Icon = allIcons[iconName];
  s.add(iconName as string, () => (
    <Icon width={text('width', '32px')} height={text('height', '32px')} color={color('color', colors.tints.white)} />
  ));
}
