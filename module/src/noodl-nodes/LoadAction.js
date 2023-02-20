import { defineNode } from '@noodl/noodl-sdk'
import { CLEAR_HISTORY_COMMAND } from 'lexical'

export default defineNode({
  name: 'Lexical LoadAction',
  category: 'Lexical',
  inputs: {
    editorRef: {
      displayName: 'Editor Reference',
      type: 'object'
    },
    desiredState: {
      displayName: 'Editor State',
      type: 'object'
    },
    stateLoad: {
      displayName: 'State Load',
      type: 'signal'
    }
  },
  outputs: {
    stateLoaded: {
      displayName: 'State Loaded',
      type: 'signal'
    }
  },
  signals: {
    stateLoad: {
      displayName: 'State Load',
      signal() {
        const editorState = this.inputs.editorRef.parseEditorState(
          JSON.stringify(this.inputs.desiredState.editorState)
        )
        this.inputs.editorRef.setEditorState(editorState)
        this.inputs.editorRef.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)

        this.sendSignalOnOutput('stateLoaded')
      }
    }
  }
})
