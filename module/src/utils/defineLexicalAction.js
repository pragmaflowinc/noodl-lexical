import { defineNode } from '../noodl-sdk'

export function defineLexicalAction({ name, inputs, onAction, ...rest }) {
  return defineNode({
    name: `Lexical ${name}`,
    category: 'Lexical Action',
    color: 'component',
    inputs: {
      ...inputs,
      editorRef: {
        displayName: 'Editor Reference',
        type: 'object'
      },
    },
    signals: {
      execute: {
        displayName: 'Do',
        signal() {
          onAction(this)
        }
      }
    },
    ...rest
  })
}