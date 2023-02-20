import { defineNode } from '@noodl/noodl-sdk'
import { CLEAR_EDITOR_COMMAND } from 'lexical'

export default defineNode({
  name: 'Lexical LoadAction',
  category: 'Lexical',
  inputs: {
    editorRef: {
      displayName: 'Editor Reference',
      type: 'object'
    }
  },
  signals: {
    stateLoad: {
      displayName: 'State Load',
      signal() {
        this.inputs.editorRef.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
      }
    }
  }
})
