import { defineNode } from '../noodl-sdk'

export function defineLexicalNode({ name, node }) {
  return defineNode({
    name: `Lexical ${name}`,
    category: 'Lexical Nodes',
    color: 'data',
    initialize() {
      this.setOutputs({
        node: node
      })
      this.clearWarnings();
    },
    outputs: {
      node: {
        type: 'object',
        displayName: 'Node class'
      }
    }
  })
}