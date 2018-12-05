import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import 'normalize.css';
import '../../src/identity/typography/fonts.css';
import '../../src/identity/spaces/spaces.css';

addDecorator(
  withInfo({
    inline: true,
    header: false
  })
);
addDecorator(withKnobs);
addDecorator(
  withOptions({
    sortStoriesByKind: true
  })
);

const req = require.context('../../src', true, /\.stories\.ts(x)?$/);

function loadStories() {
  req
    .keys()
    .sort()
    .forEach(filename => req(filename));
}

configure(loadStories, module);
