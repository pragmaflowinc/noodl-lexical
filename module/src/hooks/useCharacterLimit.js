
/* eslint-disable no-restricted-syntax */
/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import {
  $createOverflowNode,
  $isOverflowNode,
  OverflowNode
} from '@lexical/overflow'
import { $rootTextContent } from '@lexical/text'
import { $dfs, mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isLeafNode,
  $isRangeSelection,
  $isTextNode,
  $setSelection
} from 'lexical'
import { useEffect } from 'react'

function findOffset(
  text,
  maxCharacters,
  strlen
) {
  const { Segmenter } = Intl
  let offsetUtf16 = 0
  let offset = 0

  if (typeof Segmenter === 'function') {
    const segmenter = new Segmenter()
    const graphemes = segmenter.segment(text)

    for (const { segment: grapheme } of graphemes) {
      const nextOffset = offset + strlen(grapheme)

      if (nextOffset > maxCharacters) {
        break
      }

      offset = nextOffset
      offsetUtf16 += grapheme.length
    }
  } else {
    const codepoints = Array.from(text)
    const codepointsLength = codepoints.length

    for (let i = 0; i < codepointsLength; i += 1) {
      const codepoint = codepoints[i]
      const nextOffset = offset + strlen(codepoint)

      if (nextOffset > maxCharacters) {
        break
      }

      offset = nextOffset
      offsetUtf16 += codepoint.length
    }
  }

  return offsetUtf16
}

function $unwrapNode({ getChildren, insertBefore, remove }) {
  const children = getChildren()
  const childrenLength = children.length

  for (let i = 0; i < childrenLength; i += 1) {
    insertBefore(children[i])
  }

  remove()
  return childrenLength > 0 ? children[childrenLength - 1] : null
}

function $wrapNode(node) {
  const overflowNode = $createOverflowNode()
  node.insertBefore(overflowNode)
  overflowNode.append(node)
  return overflowNode
}

export function mergePrevious(overflowNode) {
  const previousNode = overflowNode.getPreviousSibling()

  if (!$isOverflowNode(previousNode)) {
    return
  }

  const firstChild = overflowNode.getFirstChild()
  const previousNodeChildren = previousNode.getChildren()
  const previousNodeChildrenLength = previousNodeChildren.length

  if (firstChild === null) {
    overflowNode.append(...previousNodeChildren)
  } else {
    for (let i = 0; i < previousNodeChildrenLength; i += 1) {
      firstChild.insertBefore(previousNodeChildren[i])
    }
  }

  const selection = $getSelection()

  if ($isRangeSelection(selection)) {
    const { anchor } = selection
    const anchorNode = anchor.getNode()
    const { focus } = selection
    const focusNode = anchor.getNode()

    if (anchorNode.is(previousNode)) {
      anchor.set(overflowNode.getKey(), anchor.offset, 'element')
    } else if (anchorNode.is(overflowNode)) {
      anchor.set(
        overflowNode.getKey(),
        previousNodeChildrenLength + anchor.offset,
        'element'
      )
    }

    if (focusNode.is(previousNode)) {
      focus.set(overflowNode.getKey(), focus.offset, 'element')
    } else if (focusNode.is(overflowNode)) {
      focus.set(
        overflowNode.getKey(),
        previousNodeChildrenLength + focus.offset,
        'element'
      )
    }
  }

  previousNode.remove()
}

function $wrapOverflowedNodes(offset) {
  const dfsNodes = $dfs()
  const dfsNodesLength = dfsNodes.length
  let accumulatedLength = 0

  for (let i = 0; i < dfsNodesLength; i += 1) {
    const { node } = dfsNodes[i]

    if ($isOverflowNode(node)) {
      const previousLength = accumulatedLength
      const nextLength = accumulatedLength + node.getTextContentSize()

      if (nextLength <= offset) {
        const parent = node.getParent()
        const previousSibling = node.getPreviousSibling()
        const nextSibling = node.getNextSibling()
        $unwrapNode(node)
        const selection = $getSelection()

        // Restore selection when the overflow children are removed
        if (
          $isRangeSelection(selection) &&
          (!selection.anchor.getNode().isAttached() ||
            !selection.focus.getNode().isAttached())
        ) {
          if ($isTextNode(previousSibling)) {
            previousSibling.select()
          } else if ($isTextNode(nextSibling)) {
            nextSibling.select()
          } else if (parent !== null) {
            parent.select()
          }
        }
      } else if (previousLength < offset) {
        const descendant = node.getFirstDescendant()
        const descendantLength = descendant !== null ? descendant.getTextContentSize() : 0
        const previousPlusDescendantLength = previousLength + descendantLength
        // For simple text we can redimension the overflow into a smaller and more accurate
        // container
        const firstDescendantIsSimpleText = $isTextNode(descendant) && descendant.isSimpleText()
        const firstDescendantDoesNotOverflow = previousPlusDescendantLength <= offset

        if (firstDescendantIsSimpleText || firstDescendantDoesNotOverflow) {
          $unwrapNode(node)
        }
      }
    } else if ($isLeafNode(node)) {
      const previousAccumulatedLength = accumulatedLength
      accumulatedLength += node.getTextContentSize()

      if (accumulatedLength > offset && !$isOverflowNode(node.getParent())) {
        const previousSelection = $getSelection()
        let overflowNode

        // For simple text we can improve the limit accuracy by splitting the TextNode
        // on the split point
        if (
          previousAccumulatedLength < offset &&
          $isTextNode(node) &&
          node.isSimpleText()
        ) {
          const [, overflowedText] = node.splitText(
            offset - previousAccumulatedLength
          )
          overflowNode = $wrapNode(overflowedText)
        } else {
          overflowNode = $wrapNode(node)
        }

        if (previousSelection !== null) {
          $setSelection(previousSelection)
        }

        mergePrevious(overflowNode)
      }
    }
  }
}

export function useCharacterLimit(
  editor,
  maxCharacters,
  optional = Object.freeze({})
) {
  const {
    strlen = (input) => input.length,
    // UTF-16
    remainingCharacters = () => {

    }
  } = optional

  useEffect(() => {
    if (!editor.hasNodes([OverflowNode])) {
      throw new Error('useCharacterLimit: OverflowNode not registered on editor')
    }
  }, [editor])

  useEffect(() => {
    let text = editor.getEditorState().read($rootTextContent)
    let lastComputedTextLength = 0

    return mergeRegister(
      editor.registerTextContentListener((currentText) => {
        text = currentText
      }),
      editor.registerUpdateListener(({ dirtyLeaves }) => {
        const isComposing = editor.isComposing()
        const hasDirtyLeaves = dirtyLeaves.size > 0

        if (isComposing || !hasDirtyLeaves) {
          return
        }

        const textLength = strlen(text)
        const textLengthAboveThreshold = textLength > maxCharacters ||
          (lastComputedTextLength !== null &&
            lastComputedTextLength > maxCharacters)
        const diff = maxCharacters - textLength

        remainingCharacters(diff)

        if (lastComputedTextLength === null || textLengthAboveThreshold) {
          const offset = findOffset(text, maxCharacters, strlen)
          editor.update(
            () => {
              $wrapOverflowedNodes(offset)
            },
            {
              tag: 'history-merge'
            }
          )
        }

        lastComputedTextLength = textLength
      })
    )
  }, [editor, maxCharacters, remainingCharacters, strlen])
}
