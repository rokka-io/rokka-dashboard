import { parse, serialize } from 'cookie';

export const get = (key: string) => (JSON.parse(parse(document.cookie)[key] || '{}') || '{}').value;

export const set = (key: string, value: any, options = {}) => {
  document.cookie = serialize(key, JSON.stringify({ value }), options);
};

export const del = (key: string) => {
  document.cookie = serialize(key, '', {
    expires: new Date(1970, 1, 1)
  });
};
