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
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode
} from '@lexical/rich-text'
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  // eslint-disable-next-line camelcase
  $setBlocksType_experimental
} from '@lexical/selection'

export const NoodlFormatText = defineLexicalAction({
  name: 'FormatText',
  inputs: {
    blockType: {
      displayName: 'Block Type',
      type: 'string'
    },
    blockTypeEnum: {
      displayName: 'Block Type Enum',
      type: {
        name: 'enum',
        enums: [{
          value: 'bullet',
          label: 'Bulleted List',
        }, {
          value: 'check',
          label: 'Check List',
        }, {
          value: 'code',
          label: 'Code Block',
        }, {
          value: 'h1',
          label: 'Heading 1',
        }, {
          value: 'h2',
          label: 'Heading 2',
        }, {
          value: 'h3',
          label: 'Heading 3',
        }, {
          value: 'h4',
          label: 'Heading 4',
        }, {
          value: 'h5',
          label: 'Heading 5',
        }, {
          value: 'h6',
          label: 'Heading 6',
        }, {
          value: 'number',
          label: 'Numbered List',
        }, {
          value: 'paragraph',
          label: 'Normal',
        }, {
          value: 'quote',
          label: 'Quote',
        }]
      }
    }
  },
  onAction(_this) {
    const editor = _this.inputs.editorRef
    switch (_this.inputs.blockType) {
      case 'paragraph':
        editor.update(() => {
          const selection = $getSelection()
          if (
            $isRangeSelection(selection) ||
            DEPRECATED_$isGridSelection(selection)
          ) { $setBlocksType_experimental(selection, () => $createParagraphNode()) }
        })
        break;
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        editor.update(() => {
          const selection = $getSelection()
          if (
            $isRangeSelection(selection) ||
            DEPRECATED_$isGridSelection(selection)
          ) {
            $setBlocksType_experimental(selection, () =>
              $createHeadingNode(_this.inputs.blockType)
            )
          }
        })
        break;
    }
  }
})

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

