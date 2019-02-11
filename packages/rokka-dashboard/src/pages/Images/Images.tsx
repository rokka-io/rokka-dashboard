import React, { FunctionComponent } from 'react';

interface ImagesProps {}

export const Images: FunctionComponent<ImagesProps> = props => {
  console.log('rerender images', props);
  return <div>Images</div>;
};
