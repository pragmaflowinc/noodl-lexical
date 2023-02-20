/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import { defineReactNode } from '@noodl/noodl-sdk'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical'
import { useEffect } from 'react'

import { $createYouTubeNode, YouTubeNode } from '../nodes/YouTubeNode'

export const INSERT_YOUTUBE_COMMAND = createCommand(
  'INSERT_YOUTUBE_COMMAND'
)

export function YouTubePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([YouTubeNode])) {
      throw new Error('YouTubePlugin: YouTubeNode not registered on editor')
    }

    return editor.registerCommand(
      INSERT_YOUTUBE_COMMAND,
      (payload) => {
        const youTubeNode = $createYouTubeNode(payload)
        $insertNodeToNearestRoot(youTubeNode)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

export default defineReactNode({
  name: 'Lexical YouTube',
  category: 'Lexical',
  getReactComponent() {
    return YouTubePlugin
  }
})
