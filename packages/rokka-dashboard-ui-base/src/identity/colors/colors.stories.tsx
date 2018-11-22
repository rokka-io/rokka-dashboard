import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { colors } from './colors';

function generateColorList(key: string): JSX.Element[] {
  return Object.keys(colors[key]).map(name => (
    <Swatch key={name}>
      <Color bg={colors[key][name]} />
      <Values>
        <ColorName>{name}</ColorName>
        <ColorValue>{colors[key][name]}</ColorValue>
      </Values>
    </Swatch>
  ));
}

storiesOf('Identities / Colors', module)
  .add('Brand', () => generateColorList('brand'))
  .add('Gray', () => generateColorList('gray'))
  .add('Cranberry', () => generateColorList('cranberry'))
  .add('Orange', () => generateColorList('orange'))
  .add('Tints', () => generateColorList('tints'));

const Swatch = styled.li`
  border: none;
  border-radius: 0.25rem;
  list-style: none;
  display: inline-flex;
  flex-direction: column;
  margin: 0 0.5rem 2rem;
  background: #efefef;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.2);
`;

const Color = styled.output<{ bg: string }>`
  background: ${({ bg }) => bg};
  width: 10rem;
  height: 6rem;
  border-radius: 0.25rem 0.25rem 0 0;
  border: 1px solid black;
`;

const ColorName = styled.var`
  font-style: normal;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #898989;
  display: block;
  margin-bottom: 1rem;
`;

const ColorValue = styled.var`
  font-style: normal;
  text-transform: uppercase;
  font-size: 1.2rem;
  color: #444;
  display: block;
`;

const Values = styled.div`
  text-align: center;
  display: inline-block;
  padding: 1rem 0;
`;
