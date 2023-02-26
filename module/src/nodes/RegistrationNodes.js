import { defineNode } from "../noodl-sdk";
export default defineNode({
  name: 'Lexical RegisterNodes',
  category: 'Lexical Nodes',
  color: 'data',
  allowChildren: true,
  allowChildrenWithCategory: ['Lexical Nodes'],
  initialize() {
    this._internal.children = []
    this.setOutputs({
      nodes: this._internal.children
    })
    this.clearWarnings();
  },
  outputs: {
    nodes: {
      type: 'array',
      displayName: 'Lexical Nodes'
    }
  },
  methods: {
    addChild(child, index) {
      child.parent = this;
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
  }
})