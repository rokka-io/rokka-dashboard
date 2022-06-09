import React, { useEffect, useRef } from 'react'
import { JsonEditor as Editor } from 'jsoneditor-react'
import ace from 'brace'
import 'jsoneditor-react/es/editor.min.css'
import 'brace/mode/json'
import { normalizeStack, removeIdAndErrorsToStackOperations } from '../../state'

export const JsonEditor = ({ value, setValue }) => {
  const jsonEditorRef = useRef(null)

  const setRef = instance => {
    if (instance) {
      jsonEditorRef.current = instance.jsonEditor
    } else {
      jsonEditorRef.current = null
    }
  }

  const cleanedValue = removeIdAndErrorsToStackOperations(normalizeStack(value))

  useEffect(() => {
    jsonEditorRef.current.set(cleanedValue)
  }, [cleanedValue.name])
  return (
    <Editor
      htmlElementProps={{ style: { height: '75vh' } }}
      mode={'code'}
      value={cleanedValue}
      onChange={e => {
        setValue(e)
      }}
      ref={setRef}
      ace={ace}
      history={false}
      statusBar={false}
      search={false}
      navigationBar={false}
      theme="ace/theme/textmate"
    />
  )
}

export default JsonEditor
