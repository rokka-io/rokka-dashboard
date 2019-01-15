import React, { FunctionComponent } from 'react';
import { LiPosRelative } from 'rokka-dashboard-ui-base';
import { navigation } from '../../pages/routes';

export const Navigation: FunctionComponent = () => (
  <>
    {navigation.map(({ name, relative, navigationComponent }) =>
      relative ? <LiPosRelative key={name}>{navigationComponent}</LiPosRelative> : <li key={name}>{navigationComponent}</li>
    )}
  </>
);
