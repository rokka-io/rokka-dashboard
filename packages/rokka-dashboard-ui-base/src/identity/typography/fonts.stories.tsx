import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { fonts } from './index';

storiesOf('Identities / Typography', module)
  .addParameters({ info: { disable: true } })
  .add('Fonts', () => {
    return (
      <ul>
        {Object.keys(fonts.Families).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontFamilyPreview font={fonts.Families[name]}>{fonts.Families[name]}</FontFamilyPreview>
          </Entry>
        ))}
      </ul>
    );
  })
  .add('Sizes', () => {
    return (
      <ul>
        {Object.keys(fonts.Sizes).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontSizePreview size={fonts.Sizes[name]}>{fonts.Sizes[name]}</FontSizePreview>
          </Entry>
        ))}
      </ul>
    );
  })
  .add('Weights', () => {
    return (
      <ul>
        {Object.keys(fonts.Weights).map(name => (
          <Entry key={name}>
            <FontName>{name}</FontName>
            <FontWeightPreview weight={fonts.Weights[name]}>{fonts.Weights[name]}</FontWeightPreview>
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

const FontWeightPreview = styled.span<{ weight: number }>`
  font-weight: ${({ weight }) => weight};
`;
