
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { HashtagNode } from '@lexical/hashtag'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { OverflowNode } from '@lexical/overflow'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { defineLexicalNode } from '../utils/defineLexicalNode'

export const NoodlHashtagNode = defineLexicalNode({
  name: 'HashtagNode',
  node: HashtagNode
})

export const NoodlCodeHighlightNode = defineLexicalNode({
  name: 'CodeHighlightNode',
  node: CodeHighlightNode
})

export const NoodlCodeNode = defineLexicalNode({
  name: 'CodeNode',
  node: CodeNode
})

export const NoodlAutoLinkNode = defineLexicalNode({
  name: 'AutoLinkNode',
  node: AutoLinkNode
})

export const NoodlLinkNode = defineLexicalNode({
  name: 'LinkNode',
  node: LinkNode
})

export const NoodlListItemNode = defineLexicalNode({
  name: 'ListItemNode',
  node: ListItemNode
})

export const NoodlListNode = defineLexicalNode({
  name: 'ListNode',
  node: ListNode
})

export const NoodlMarkNode = defineLexicalNode({
  name: 'MarkNode',
  node: MarkNode
})

export const NoodlOverflowNode = defineLexicalNode({
  name: 'OverflowNode',
  node: OverflowNode
})

export const NoodlHorizontalRuleNode = defineLexicalNode({
  name: 'HorizontalRuleNode',
  node: HorizontalRuleNode
})

export const NoodlHeadingNode = defineLexicalNode({
  name: 'HeadingNode',
  node: HeadingNode
})

export const NoodlQuoteNode = defineLexicalNode({
  name: 'QuoteNode',
  node: QuoteNode
})

export const NoodlTableCellNode = defineLexicalNode({
  name: 'TableCellNode',
  node: TableCellNode
})

export const NoodlTableNode = defineLexicalNode({
  name: 'TableTableNode',
  node: TableNode
})

export const NoodlTableRowNode = defineLexicalNode({
  name: 'TableRowNode',
  node: TableRowNode
})