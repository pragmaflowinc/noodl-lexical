
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function CheckList(props) {
  return <CheckListPlugin />
}

export default defineReactNode({
  name: 'Lexical Checklist',
  category: 'Lexical',
  getReactComponent() {
    return CheckList
  }
})
