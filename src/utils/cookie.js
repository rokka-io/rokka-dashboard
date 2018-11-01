import { parse, serialize } from 'cookie'

const cookies = document.cookie

export const get = key => (JSON.parse(parse(cookies)[key] || null) || '{}').value

export const set = (key, value, options = {}) => {
  document.cookie = serialize(key, JSON.stringify({ value }), options)
}

export const del = key => {
  document.cookie = serialize(key, '', {
    expires: new Date('1970', '01', '01')
  })
}
