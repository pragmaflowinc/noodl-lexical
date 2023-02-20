import './composer.css'
import React from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { defineReactNode } from '@noodl/noodl-sdk'

import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { OverflowNode } from '@lexical/overflow'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

import { SettingsProvider } from './context/SettingsContext'
import NoodleEditorTheme from './themes/NoodlEditorTheme'
import { Nodes } from '../nodes'

const emptyEditorState = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

function Composer(props) {
  const initialState = {
    editorState: props.editorState ? props.editorState : emptyEditorState,
    nodes: [
      ...Nodes,
      HashtagNode,
      CodeHighlightNode,
      CodeNode,
      AutoLinkNode,
      LinkNode,
      ListItemNode,
      ListNode,
      MarkNode,
      OverflowNode,
      HorizontalRuleNode,
      HeadingNode,
      QuoteNode,
      TableCellNode,
      TableNode,
      TableRowNode
    ],
    onError(error) {
      console.error(error)
    },
    theme: NoodleEditorTheme
  }
  return (
    <SettingsProvider>
      <LexicalComposer initialConfig={initialState}>
          {props.children}
      </LexicalComposer>
    </SettingsProvider>
  )
}

export const ComposerReactNode = defineReactNode({
  name: 'Lexical Composer',
  category: 'Lexical',
  getReactComponent() {
    return Composer
  },
  inputProps: {
    editorState: {
      type: 'object',
      displayName: 'Initial State'
    },
    nodes: {
      type: 'componen',
      displayName: 'Nodes'
    }

  }
})
