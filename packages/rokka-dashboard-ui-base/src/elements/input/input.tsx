import React, { ReactElement, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { colors } from '../../identity/colors/colors';
import { spaces } from '../../identity/spaces/spaces';
import { fonts } from '../../identity/typography';

interface InputProps<T> {
  /** input name */
  name: string;
  /** input value */
  value: T;
  /** onChange is fired when the input changes */
  onChange: (name: string, value: T) => void;
  /** deserialize from T to a string or null. Used for rawValue. */
  deserialize: (value: T) => string | null;
  /** serialize to T from target */
  serialize: (target: HTMLInputElement) => T;
  /** render prop */
  children: (
    props: {
      value: T;
      rawValue: string | null;
      onChange: (evt: SyntheticEvent) => void;
    }
  ) => ReactElement<{}>;
}

function Input<T>({ name, value, onChange, deserialize, serialize, children }: InputProps<T>) {
  return children({
    value,
    rawValue: deserialize(value),
    onChange: (evt: SyntheticEvent) => {
      evt.preventDefault();
      onChange(name, serialize(evt.target as HTMLInputElement));
    }
  });
}

interface TextInputProps {
  /** input name */
  name: string;
  /** input value */
  value: string;
  /** onChange fired when input value changes */
  onChange: (name: string, value: string) => void;
  /** placeholder for input */
  placeholder?: string;
  /** input type, default text */
  type?: string;
  /** is input disabled */
  disabled?: boolean;
  /** className mainly used for styled components */
  className?: string;
}

export function TextInput({ name, value, onChange, type = 'text', ...props }: TextInputProps) {
  return (
    <Input name={name} value={value} onChange={onChange} serialize={r => r.value} deserialize={v => v}>
      {p => <StyledInput name={name} value={p.value} onChange={p.onChange} type={type} {...props} />}
    </Input>
  );
}

interface BooleanInputProps {
  /** input name */
  name: string;
  /** input value */
  value: boolean;
  /** onChange fired when input value changes */
  onChange: (name: string, value: boolean) => void;
  /** is input disabled */
  disabled?: boolean;
  /** className mainly used for styled components */
  className?: string;
}

export function BooleanInput({ name, value, onChange, ...props }: BooleanInputProps) {
  return (
    <Input
      name={name}
      value={value}
      onChange={onChange}
      serialize={r => r.checked}
      deserialize={v => (v ? 'true' : 'false')}
    >
      {p => <StyledInput checked={p.value} onChange={p.onChange} type="checkbox" {...props} />}
    </Input>
  );
}

interface NumberInputProps {
  /** input name */
  name: string;
  /** input value */
  value: number;
  onChange: (name: string, value: number) => void;
  /** is input disabled */
  disabled?: boolean;
  /** className mainly used for styled components */
  className?: string;
}

export function NumberInput({ name, value, onChange, ...props }: NumberInputProps) {
  return (
    <Input
      name={name}
      value={value}
      onChange={onChange}
      serialize={r => Number.parseInt(r.value, 10)}
      deserialize={v => `${v}`}
    >
      {p => <StyledInput value={p.value} onChange={p.onChange} type="number" {...props} />}
    </Input>
  );
}

const StyledInput = styled.input`
  font-family: ${fonts.Families.brand};
  font-size: ${fonts.Sizes.small};
  width: 100%;
  height: 38px;
  line-height: 38px;
  border: 1px solid ${colors.gray.light};
  padding: 0 ${spaces.small};
  outline: none;

  :focus {
    transition: border 0.4s ease;
    border-color: ${colors.gray.darker};
  }

  :disabled {
    color: ${colors.gray.darkest};
    background: ${colors.gray.lighter};
  }
`;
