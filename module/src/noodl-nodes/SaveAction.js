import { defineNode } from '@noodl/noodl-sdk'

export default defineNode({
  name: 'Lexical SaveAction',
  category: 'Lexical',
  inputs: {
    editorRef: {
      displayName: 'Editor Reference',
      type: 'object'
    },
    editorSave: {
      displayName: 'Editor Reference',
      type: 'object'
    }
  },
  outputs: {
    state: {
      displayName: 'Current State',
      type: 'object'
    },
    stateReady: {
      displayName: 'State Ready',
      type: 'signal'
    }
  },
  signals: {
    getState: {
      displayName: 'State Ready',
      signal() {
        this.setOutputs({ state: this.inputs.editorRef.toJSON() })
        this.sendSignalOnOutput('stateReady')
      }
    }
  }
})
