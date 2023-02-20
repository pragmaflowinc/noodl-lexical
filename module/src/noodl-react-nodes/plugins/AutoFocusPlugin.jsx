import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function AutoFocus() {
  return <AutoFocusPlugin />
}

export default defineReactNode({
  name: 'Lexical AutoFocus',
  category: 'Lexical',
  getReactComponent() {
    return AutoFocus
  }
})
