import React, { useState } from 'react'
import 'jsoneditor-react/es/editor.min.css'
import 'brace/mode/json'
import 'brace/theme/textmate'
import { normalizeStack } from '../../state'
import JSONPretty from 'react-json-prettify'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const JsonView = ({ value }) => {
  const cleanedValue = { ...normalizeStack(value) }
  const theme = {
    background: 'rgb(255, 255, 255)',
    brace: 'rgb(0, 0, 0)',
    keyQuotes: 'rgb(49, 132, 149)',
    valueQuotes: 'rgb(3, 106, 7)',
    colon: 'rgb(0,0,0)',
    comma: 'rgb(0,0,0)',
    key: 'rgb(49, 132, 149)',
    value: {
      string: 'rgb(3, 106, 7)',
      null: 'rgb(0, 0,0)',
      number: 'rgb(0, 0, 205)',
      boolean: 'rgb(88, 92, 246)'
    },
    bracket: 'rgb(0, 0, 0)'
  }
  cleanedValue.operations = cleanedValue.operations.map(op => {
    delete op.id
    delete op.errors
    return op
  })
  console.log('JSONView', cleanedValue)
  const [copied, setCopied] = useState(false)
  return (
    <>
      <div style={{ marginBottom: 10 }}>
        {
          <CopyToClipboard
            text={JSON.stringify(cleanedValue, null, 2)}
            onCopy={() => setCopied(true)}
          >
            <button className={'rka-button rka-button-brand'}>
              {copied ? 'Copied!' : 'Copy to clipboard'}{' '}
            </button>
          </CopyToClipboard>
        }
      </div>
      <div style={{ border: '1px solid #DDDDD8' }}>
        <JSONPretty
          style={{ marginTop: '0px' }}
          json={JSON.parse(JSON.stringify(cleanedValue))}
          theme={theme}
          padding={2}
        />
      </div>
    </>
  )
}

export default JsonView
