import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function HorizontalRule(props) {
  return <HorizontalRulePlugin />
}

export default defineReactNode({
  name: 'Lexical HorizontalRule',
  category: 'Lexical',
  getReactComponent() {
    return HorizontalRule
  }
})
