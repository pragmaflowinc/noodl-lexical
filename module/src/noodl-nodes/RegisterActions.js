import { defineNode } from "../noodl-sdk";
export const NoodleRegisterActions = defineNode({
  name: "Lexical RegisterActions",
  category: "Lexical Action",
  color: "component",
  allowChildren: true,
  allowChildrenWithCategory: ["Lexical Action"],
  initialize() {
    this._internal.children = [];
    this.setOutputs({
      nodes: this._internal.children,
    });
    this.clearWarnings();
  },
  inputs: {
    editorRef: {
      type: "object",
      displayName: "Editor Ref",
    },
    activeEditorRef: {
      type: "object",
      displayName: "Active Editor Ref",
    },
  },
  outputs: {
    nodes: {
      type: "array",
      displayName: "Lexical Actions",
    },
  },
  changed: {
    editorRef(value) {
      this._internal.children.forEach(
        (child) => (child.inputs.editorRef = value)
      );
    },
    activeEditorRef(value) {
      this._internal.children.forEach(
        (child) => (child.inputs.activeEditorRef = value)
      );
    },
  },
  methods: {
    addChild(child, index) {
      child.parent = this;
      child.inputs.editorRef = this.inputs.editorRef;
      child.inputs.activeEditorRef = this.inputs.activeEditorRef;
      this._internal.children.push(child);
    },
    removeChild(child) {
      const index = this._internal.children.indexOf(child);
      if (index !== -1) {
        this._internal.children.splice(index, 1);
        child.parent = undefined;
      }
    },
    getChildren() {
      return this._internal.children;
    },
  },
});
