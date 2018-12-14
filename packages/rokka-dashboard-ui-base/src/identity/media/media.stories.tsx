import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { breakpoints, mediaBreakpoints } from './media';

storiesOf('Identities / Media', module).add(
  'Media',
  () => (
    <StyledMedia>
      <h2>Breakpoints</h2>
      {Object.keys(breakpoints).map(bp => {
        const breakpoint = breakpoints[bp];
        return (
          <div key={bp}>
            <h2>{bp}</h2>
            {breakpoint.Min && <p>Min Width: {breakpoint.Min / 16}em</p>}
            {breakpoint.Max && <p>Max Width: {breakpoint.Max / 16}em</p>}
          </div>
        );
      })}
      <h1>Media Queries</h1>
      <p>For using media query identity use the following breakpoint methods (background: #f00; as example of css rule):</p>
      <ul>
        {Object.keys(mediaBreakpoints).map((mediaBreakpoint, i) => {
          return (
            <li key={'mediabreakpoint-' + i}>
              <strong>$media.{mediaBreakpoint} `background: #f00;`</strong>
              <p>output css : {mediaBreakpoints[mediaBreakpoint]}</p>
            </li>
          );
        })}
      </ul>
    </StyledMedia>
  ),
  { info: { disable: true } }
);

const StyledMedia = styled.div`
  padding: 0 20px;
`;
