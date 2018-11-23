import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, configure } from '@storybook/react';

addDecorator(
  withInfo({
    inline: true,
    header: false
  })
);
addDecorator(withKnobs);

require('normalize.css');

const req = require.context('../../src', true, /\.stories\.ts(x)?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
