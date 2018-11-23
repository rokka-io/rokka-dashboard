import React from 'react';
import { storiesOf } from '@storybook/react';
import { fonts } from './index';
import styled from 'styled-components';

storiesOf('01 - Identities / Typography', module)
  .addParameters({ info: { disable: true } })
  .add('Fonts', () => {
    return (
      <ul>
        {Object.keys(fonts['families']).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontFamilyPreview font={fonts['families'][name]}>{fonts['families'][name]}</FontFamilyPreview>
          </Entry>
        ))}
      </ul>
    );
  })
  .add('Sizes', () => {
    return (
      <ul>
        {Object.keys(fonts['sizes']).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontSizePreview size={fonts['sizes'][name]}>{fonts['sizes'][name]}</FontSizePreview>
          </Entry>
        ))}
      </ul>
    );
  })
  .add('Weights', () => {
    return (
      <ul>
        {Object.keys(fonts['weights']).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontWeightPreview weight={fonts['weights'][name]}>{fonts['weights'][name]}</FontWeightPreview>
          </Entry>
        ))}
      </ul>
    );
  });

const Entry = styled.li`
  list-style: none;
  padding: 2rem 0;
  border-bottom: 1px solid #efefef;
`;

export const FontName = styled.span`
  font-style: normal;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #898989;
  display: block;
  margin-bottom: 1rem;
`;

const FontFamilyPreview = styled.span<{ font: string }>`
  font-family: ${({ font }) => font};
`;

const FontSizePreview = styled.span<{ size: string }>`
  font-size: ${({ size }) => size};
`;

const FontWeightPreview = styled.span<{ weight: string }>`
  font-weight: ${({ weight }) => weight};
`;
