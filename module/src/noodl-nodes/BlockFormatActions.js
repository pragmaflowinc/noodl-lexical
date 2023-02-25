import { CLEAR_EDITOR_COMMAND } from 'lexical'
import { defineLexicalAction } from '../utils/defineLexicalAction'
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  // eslint-disable-next-line camelcase
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from 'lexical'

export const NoodlFormatParagraphAction = defineLexicalAction({
  name: 'FormatParagraph',
  onAction(_this) {
    editor.update(() => {
      const selection = $getSelection()
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) { $setBlocksType_experimental(selection, () => $createParagraphNode()) }
    })

  }
})
