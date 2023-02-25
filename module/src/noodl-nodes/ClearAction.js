import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { defineLexicalAction } from '../utils/defineLexicalAction'

export const NoodlClearAction = defineLexicalAction({
  name: 'ClearAction',
  onAction(_this) {
    _this.inputs.editorRef.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
  }
})
