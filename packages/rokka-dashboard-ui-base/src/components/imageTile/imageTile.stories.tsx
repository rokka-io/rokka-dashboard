import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import React from 'react';

import { ImageTile } from './imageTile';

storiesOf('Components / Images', module).add('Tile', () => 
  <ImageTile 
    blankUrl="https://liip-development.rokka.io/dynamic/ae84d11a19cc3f57a9e833214a30ee128cdcc17d.png"
    imageUrl="https://liip-development.rokka.io/dynamic/resize-height-120/ae84d11a19cc3f57a9e833214a30ee128cdcc17d.png" 
    imageName="foobar.jpg"
    imageSpecs="PNG, 55KB, 640×960"
    clickable={boolean('clickable', true)} />
);
