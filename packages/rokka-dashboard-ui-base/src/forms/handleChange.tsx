import { ChangeEvent } from 'react';

export interface ChangeData {
  [name: string]: string | boolean;
}

export const handleChange = (onChange: (update: ChangeData) => void) => (event: ChangeEvent<HTMLInputElement>) => {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  onChange({
    [name]: value
  });
};
