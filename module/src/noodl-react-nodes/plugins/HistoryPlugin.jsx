import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function History(props) {
  return <HistoryPlugin />
}

export default defineReactNode({
  name: 'Lexical History',
  category: 'Lexical',
  getReactComponent() {
    return History
  }
})
