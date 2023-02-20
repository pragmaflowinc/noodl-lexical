import React from 'react'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { defineReactNode } from '@noodl/noodl-sdk'

function OnChange(props) {
  function onChange(editorState) { }
  return <OnChangePlugin onChange={onChange} />
}

export default defineReactNode({
  name: 'Lexical OnChange',
  category: 'Lexical',
  getReactComponent() {
    return OnChange
  },
  inputProps: {
    placeholder: {
      type: 'string', /* can be JSX or something in the future */
      displayName: 'Placeholder'
    }
  },
  outputProps: {
    onChange: {
      type: 'signal',
      displayName: 'On Change'
    },
    editorState: {
      type: 'object',
      displayName: 'Editor State'
    }
  }
})
