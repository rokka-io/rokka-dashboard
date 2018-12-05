import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Link } from './link';

storiesOf('Elements / Links', module).add('Link', () => <Link href="/foobar">{text('text', 'This is a Link')}</Link>);
