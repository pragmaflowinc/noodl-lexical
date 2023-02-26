import { useState, useEffect, useCallback } from "react";
import { defineReactNode } from "@noodl/noodl-sdk";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from "@lexical/selection";
import { $isCodeNode, CODE_LANGUAGE_MAP } from "@lexical/code";
import { $isLinkNode } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical";
import { getSelectedNode } from "../utils/getSelectedNode";
import { blockTypeToBlockName } from "../utils/getBlockType";

function EditorState(props) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [fontSize, setFontSize] = useState("15px");
  const [fontColor, setFontColor] = useState("#000");
  const [bgColor, setBgColor] = useState("#fff");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [activeEditor, setActiveEditor] = useState(editor);

  useEffect(() => {
    props.onPropertyChanged("blockType", blockType);
  }, [blockType]);
  useEffect(() => {
    props.onPropertyChanged("fontSize", fontSize);
  }, [fontSize]);
  useEffect(() => {
    props.onPropertyChanged("fontColor", fontColor);
  }, [fontColor]);
  useEffect(() => {
    props.onPropertyChanged("bgColor", bgColor);
  }, [bgColor]);
  useEffect(() => {
    props.onPropertyChanged("fontFamily", fontFamily);
  }, [fontFamily]);
  useEffect(() => {
    props.onPropertyChanged("isLink", isLink);
  }, [isLink]);
  useEffect(() => {
    props.onPropertyChanged("isBold", isBold);
  }, [isBold]);
  useEffect(() => {
    props.onPropertyChanged("isItalic", isItalic);
  }, [isItalic]);
  useEffect(() => {
    props.onPropertyChanged("isUnderline", isUnderline);
  }, [isUnderline]);
  useEffect(() => {
    props.onPropertyChanged("isStrikethrough", isStrikethrough);
  }, [isStrikethrough]);
  useEffect(() => {
    props.onPropertyChanged("isSubscript", isSubscript);
  }, [isSubscript]);
  useEffect(() => {
    props.onPropertyChanged("isSuperscript", isSuperscript);
  }, [isSuperscript]);
  useEffect(() => {
    props.onPropertyChanged("isCode", isCode);
  }, [isCode]);
  useEffect(() => {
    props.onPropertyChanged("canUndo", canUndo);
  }, [canUndo]);
  useEffect(() => {
    props.onPropertyChanged("canRedo", canRedo);
  }, [canRedo]);
  useEffect(() => {
    props.onPropertyChanged("isRTL", isRTL);
  }, [isRTL]);
  useEffect(() => {
    props.onPropertyChanged("codeLanguage", codeLanguage);
  }, [codeLanguage]);
  useEffect(() => {
    props.onPropertyChanged("isEditable", isEditable);
  }, [isEditable]);
  useEffect(() => {
    props.onPropertyChanged("activeEditorRef", activeEditor);
  }, [activeEditor]);

  useEffect(() => {
    if (editor) {
      props.onDidMount(editor);
      setIsEditable(editor.isEditable());
      setActiveEditor(editor);
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        props.onContentChanged();
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, editor, updateToolbar]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ""
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
    }
  }, [activeEditor]);

  return null;
}

export default defineReactNode({
  name: "Lexical EditorState",
  category: "Lexical",
  getReactComponent() {
    return EditorState;
  },
  initialize() {
    this.props.onDidMount = (domElement) => {
      this.setOutputs({ editorRef: domElement });
      this.sendSignalOnOutput("editorSet");
    };
    this.props.onPropertyChanged = (propertyName, propertyValue) => {
      this.setOutputs({ [propertyName]: propertyValue });
      this.sendSignalOnOutput("propertyChanged");
    };
    this.props.onContentChanged = () => {
      debugger;
      this.sendSignalOnOutput("contentChanged");
    };
  },
  outputs: {
    editorRef: {
      type: "object",
      displayName: "Editor Ref",
    },
    activeEditorRef: {
      type: "object",
      displayName: "Active Editor Ref",
    },
    editorSet: {
      type: "signal",
      displayName: "Ref ready",
    },
    propertyChanged: {
      type: "signal",
      displayName: "Property Changed",
    },
    contentChanged: {
      type: "signal",
      displayName: "Content Changed",
    },
    blockType: {
      type: "string",
      displayName: "Block Type",
    },
    fontSize: {
      type: "string",
      displayName: "Font Size",
    },
    fontColor: {
      type: "string",
      displayName: "Font Color",
    },
    bgColor: {
      type: "string",
      displayName: "Backgound Color",
    },
    fontFamily: {
      type: "string",
      displayName: "Font Family",
    },
    isLink: {
      type: "boolean",
      displayName: "Is Link",
    },
    isBold: {
      type: "boolean",
      displayName: "Is Bold",
    },
    isItalic: {
      type: "boolean",
      displayName: "Is Italic",
    },
    isUnderline: {
      type: "boolean",
      displayName: "Is Underline",
    },
    isStrikethrough: {
      type: "boolean",
      displayName: "Is Strikethrough",
    },
    isSubscript: {
      type: "boolean",
      displayName: "Is Subscript",
    },
    isSuperscript: {
      type: "boolean",
      displayName: "Is Superscript",
    },
    isCode: {
      type: "boolean",
      displayName: "Is Code",
    },
    codeLanguage: {
      type: "string",
      displayName: "Code Language",
    },
    canUndo: {
      type: "boolean",
      displayName: "Can Undo",
    },
    canRedo: {
      type: "boolean",
      displayName: "Can Redo",
    },
    isRTL: {
      type: "boolean",
      displayName: "Is RTL",
    },
    isEditable: {
      type: "boolean",
      displayName: "Is Editable",
    },
  },
});
