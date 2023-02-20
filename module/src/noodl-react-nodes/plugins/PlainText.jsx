import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'

function PlainText(props) {
  return <PlainTextPlugin
    contentEditable={<ContentEditable />}
    placeholder={props.placeholder || ''}
    ErrorBoundary={LexicalErrorBoundary}
  />
}

export default defineReactNode({
  name: 'Lexical PlainText',
  category: 'Lexical',
  getReactComponent() {
    return PlainText
  },
  inputProps: {
    placeholder: {
      type: 'string', /* can be JSX or something in the future */
      displayName: 'Placeholder',
      default: ''
    }
  }
})
