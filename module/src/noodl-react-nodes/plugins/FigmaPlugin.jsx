/**
 * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import { defineReactNode } from '@noodl/noodl-sdk'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical'
import { useEffect } from 'react'

import { $createFigmaNode, FigmaNode } from '../nodes/figmaNode'

export const INSERT_FIGMA_COMMAND = createCommand(
  'INSERT_FIGMA_COMMAND'
)

export function FigmaPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([FigmaNode])) {
      throw new Error('FigmaPlugin: FigmaNode not registered on editor')
    }

    return editor.registerCommand(
      INSERT_FIGMA_COMMAND,
      (payload) => {
        const figmaNode = $createFigmaNode(payload)
        $insertNodeToNearestRoot(figmaNode)
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

export default defineReactNode({
  name: 'Lexical Figma',
  category: 'Lexical',
  getReactComponent() {
    return FigmaPlugin
  }
})
