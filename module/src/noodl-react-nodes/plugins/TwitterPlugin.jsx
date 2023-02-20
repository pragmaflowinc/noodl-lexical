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

import { $createTweetNode, TweetNode } from '../nodes/TweetNode'

export const INSERT_TWEET_COMMAND = createCommand(
  'INSERT_TWEET_COMMAND'
)

export function TwitterPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([TweetNode])) {
      throw new Error('TwitterPlugin: TweetNode not registered on editor')
    }

    return editor.registerCommand(
      INSERT_TWEET_COMMAND,
      (payload) => {
        const tweetNode = $createTweetNode(payload)
        $insertNodeToNearestRoot(tweetNode)

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}

export default defineReactNode({
  name: 'Lexical Twitter',
  category: 'Lexical',
  getReactComponent() {
    return TwitterPlugin
  }
})
