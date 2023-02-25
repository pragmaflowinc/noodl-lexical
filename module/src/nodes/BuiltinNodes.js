
import { defineNode } from '../noodl-sdk'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'

import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { OverflowNode } from '@lexical/overflow'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'

export const NoodlHashtagNode = defineNode({
  name: 'Lexical HashtagNode',
  category: 'Lexical Nodes',
  initialize() {
    this.clearWarnings();
    this.setOutputs({
      node: HashtagNode
    })
  }
})

export const NoodlCodeHighlightNode = defineNode({
  name: 'Lexical CodeHighlightNode',
  category: 'Lexical Nodes',
  initialize() {
    this.clearWarnings();
    this.setOutputs({
      node: CodeHighlightNode
    })
  }
})

export const NoodlCodeNode = defineNode({
  name: 'Lexical CodeNode',
  category: 'Lexical Nodes',
  initialize() {
    this.clearWarnings();
    this.setOutputs({
      node: CodeNode
    })
  }
})

export const NoodlAutoLinkNode = defineNode({
  name: 'Lexical AutoLinkNode',
  category: 'Lexical Nodes',
  initialize() {
    this.clearWarnings();
    this.setOutputs({
      node: AutoLinkNode
    })
  }
})


export const NoodlLinkNode = defineNode({
  name: 'Lexical LinkNode',
  category: 'Lexical Nodes',
  initialize() {
    this.clearWarnings();
    this.setOutputs({
      node: LinkNode
    })
  }
})

