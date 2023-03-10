import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { defineReactNode } from "@noodl/noodl-sdk";

import { SettingsProvider } from "../context/SettingsContext";
import NoodleEditorTheme from "../themes/NoodlEditorTheme";

const emptyEditorState =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

function Composer(props) {
  const initialState = {
    editorState: props.editorState ? props.editorState : emptyEditorState,
    nodes: [
      ...(props.lexicalNodes
        ? props.lexicalNodes.map((ln) => ln.outputs.node)
        : []),
    ],
    onError(error) {
      console.error(error);
    },
    theme: NoodleEditorTheme,
  };
  return (
    <SettingsProvider>
      <LexicalComposer initialConfig={initialState}>
        <div className="editor-shell">{props.children}</div>
      </LexicalComposer>
    </SettingsProvider>
  );
}

export const ComposerReactNode = defineReactNode({
  name: "Lexical Composer",
  category: "Lexical",
  getReactComponent() {
    return Composer;
  },
  initialize() {},
  changed: {
    lexicalNodes(value) {
      if (!value) {
        this.sendWarning(
          "Missing Nodes",
          "There are no nodes configured for the composer. Add a RegisteredNode and connect it to the composer"
        );
      }
    },
  },
  inputProps: {
    editorState: {
      type: "object",
      displayName: "Initial State",
    },
    lexicalNodes: {
      type: "array",
      displayName: "Nodes",
    },
  },
});
