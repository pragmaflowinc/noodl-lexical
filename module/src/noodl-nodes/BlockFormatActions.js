import { CLEAR_EDITOR_COMMAND } from "lexical";
import { defineLexicalAction } from "../utils/defineLexicalAction";
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
  UNDO_COMMAND,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $selectAll,
  // eslint-disable-next-line camelcase
  $setBlocksType_experimental,
} from "@lexical/selection";
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { getBlockType } from "../utils/getBlockType";

export const NoodlFormatBlock = defineLexicalAction({
  name: "FormatBlock",
  inputs: {
    blockFormatEnum: {
      displayName: "Block Type Enum",
      type: {
        name: "enum",
        enums: [
          {
            value: "bullet",
            label: "Bulleted List (bullet)",
          },
          {
            value: "check",
            label: "Check List (check)",
          },
          {
            value: "code",
            label: "Code Block (code)",
          },
          {
            value: "h1",
            label: "Heading 1 (h1)",
          },
          {
            value: "h2",
            label: "Heading 2 (h2)",
          },
          {
            value: "h3",
            label: "Heading 3 (h3)",
          },
          {
            value: "h4",
            label: "Heading 4 (h4)",
          },
          {
            value: "h5",
            label: "Heading 5 (h5)",
          },
          {
            value: "h6",
            label: "Heading 6 (h6)",
          },
          {
            value: "number",
            label: "Numbered List (number)",
          },
          {
            value: "paragraph",
            label: "Normal (paragraph)",
          },
          {
            value: "quote",
            label: "Quote (quote)",
          },
        ],
      },
    },
  },
  onAction(_this) {
    debugger;

    const editor = _this.inputs.editorRef;
    const activeEditor = _this.inputs.activeEditorRef;
    editor.getEditorState().read(() => {
      const blockType = getBlockType(activeEditor);
      switch (_this.inputs.blockFormatEnum) {
        case "paragraph":
          if (blockType !== "paragraph") {
            editor.update(() => {
              const selection = $getSelection();
              if (
                $isRangeSelection(selection) ||
                DEPRECATED_$isGridSelection(selection)
              ) {
                $setBlocksType_experimental(selection, () =>
                  $createParagraphNode()
                );
              }
            });
          }
          break;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          if (blockType !== _this.inputs.blockFormatEnum) {
            editor.update(() => {
              const selection = $getSelection();
              if (
                $isRangeSelection(selection) ||
                DEPRECATED_$isGridSelection(selection)
              ) {
                $setBlocksType_experimental(selection, () =>
                  $createHeadingNode(_this.inputs.blockFormatEnum)
                );
              }
            });
          }
          break;
        case "bullet":
          if (blockType !== "bullet") {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }
          break;
        case "check":
          if (blockType !== "check") {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }
          break;
        case "code":
          if (blockType !== "code") {
            editor.update(() => {
              let selection = $getSelection();

              if (
                $isRangeSelection(selection) ||
                DEPRECATED_$isGridSelection(selection)
              ) {
                if (selection.isCollapsed()) {
                  $setBlocksType_experimental(selection, () =>
                    $createCodeNode()
                  );
                } else {
                  const textContent = selection.getTextContent();
                  const codeNode = $createCodeNode();
                  selection.insertNodes([codeNode]);
                  selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    selection.insertRawText(textContent);
                  }
                }
              }
            });
          }
          break;
        case "number":
          if (blockType !== "number") {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
          } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
          }
          break;
        case "quote":
          if (blockType !== "quote") {
            editor.update(() => {
              const selection = $getSelection();
              if (
                $isRangeSelection(selection) ||
                DEPRECATED_$isGridSelection(selection)
              ) {
                $setBlocksType_experimental(selection, () =>
                  $createQuoteNode()
                );
              }
            });
          }
          break;
        default:
          _this.showWarning(
            "Block Format",
            `Tried to set and invalid format of ${_this.inputs.blockFormatEnum}`
          );
      }
    });
  },
});

export const NoodlFormatText = defineLexicalAction({
  name: "FormatText",
  inputs: {
    textFormatEnum: {
      displayName: "Text Format Enum",
      type: {
        name: "enum",
        enums: [
          {
            value: "bold",
            label: "Bold",
          },
          {
            value: "check",
            label: "Check List",
          },
          {
            value: "code",
            label: "Code Block",
          },
          {
            value: "h1",
            label: "Heading 1",
          },
          {
            value: "h2",
            label: "Heading 2",
          },
          {
            value: "h3",
            label: "Heading 3",
          },
          {
            value: "h4",
            label: "Heading 4",
          },
          {
            value: "h5",
            label: "Heading 5",
          },
          {
            value: "h6",
            label: "Heading 6",
          },
          {
            value: "number",
            label: "Numbered List",
          },
          {
            value: "paragraph",
            label: "Normal",
          },
          {
            value: "quote",
            label: "Quote",
          },
        ],
      },
    },
  },
  onAction(_this) {
    const activeEditor = _this.inputs.activeEditorRef;
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  },
});

export const NoodlFormatElement = defineLexicalAction({
  name: "FormatElement",
  inputs: {
    formatElementEnum: {
      displayName: "Format Element Enum",
      type: {
        name: "enum",
        enums: [
          {
            value: "left",
            label: "Left",
          },
          {
            value: "center",
            label: "Center",
          },
          {
            value: "right",
            label: "Right",
          },
        ],
      },
    },
  },
  onAction(_this) {
    const activeEditor = _this.inputs.activeEditorRef;

    activeEditor.dispatchCommand(
      FORMAT_ELEMENT_COMMAND,
      _this.inputs.formatElementEnum
    );
  },
});

export const NoodlOutdentContent = defineLexicalAction({
  name: "Outdent",
  onAction(_this) {
    const activeEditor = _this.inputs.activeEditorRef;
    activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
  },
});

export const NoodlIndentContent = defineLexicalAction({
  name: "Indent",
  onAction(_this) {
    const activeEditor = _this.inputs.activeEditorRef;
    activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
  },
});
