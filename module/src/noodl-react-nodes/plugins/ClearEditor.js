import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function ClearEditor(props) {
  return <ClearEditorPlugin />
}

export default defineReactNode({
  name: 'Lexical ClearEditor',
  category: 'Lexical',
  getReactComponent() {
    return ClearEditor
  }
})
