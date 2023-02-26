import { CLEAR_HISTORY_COMMAND } from 'lexical'
import { defineLexicalAction } from '../utils/defineLexicalAction'

export const NoodlLoadAction = defineLexicalAction({
  name: 'LoadAction',
  inputs: {
    desiredState: {
      displayName: 'Desired Editor State',
      type: 'object'
    }
  },
  outputs: {
    stateLoaded: {
      displayName: 'State Loaded',
      type: 'signal'
    }
  },
  onAction: (_this) => {
    const editorState = _this.inputs.editorRef.parseEditorState(
      JSON.stringify(_this.inputs.desiredState.editorState)
    )
    _this.inputs.editorRef.setEditorState(editorState)
    _this.inputs.editorRef.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined)

    _this.sendSignalOnOutput('stateLoaded')
  }
})