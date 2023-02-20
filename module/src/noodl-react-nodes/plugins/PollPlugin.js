/**
 * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $wrapNodeInElement } from '@lexical/utils'
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  createCommand
} from 'lexical'
import { useEffect, useState } from 'react'
import * as React from 'react'

import { $createPollNode, PollNode } from '../../nodes/PollNode'
import Button from '../../ui/Button'
import { DialogActions } from '../../ui/Dialog'
import TextInput from '../../ui/TextInput'
import { defineReactNode } from '@noodl/noodl-sdk'

export const INSERT_POLL_COMMAND = createCommand(
  'INSERT_POLL_COMMAND'
)

export function InsertPollDialog({
  activeEditor,
  onClose
}) {
  const [question, setQuestion] = useState('')

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_POLL_COMMAND, question)
    onClose()
  }

  return (
    <>
      <TextInput label="Question" onChange={setQuestion} value={question} />
      <DialogActions>
        <Button disabled={question.trim() === ''} onClick={onClick}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}

export function PollPlugin() {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (!editor.hasNodes([PollNode])) {
      throw new Error('PollPlugin: PollNode not registered on editor')
    }

    return editor.registerCommand(
      INSERT_POLL_COMMAND,
      (payload) => {
        const pollNode = $createPollNode(payload)
        $insertNodes([pollNode])
        if ($isRootOrShadowRoot(pollNode.getParentOrThrow())) {
          $wrapNodeInElement(pollNode, $createParagraphNode).selectEnd()
        }

        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])
  return null
}

export default defineReactNode({
  name: 'Lexical Poll',
  category: 'Lexical',
  getReactComponent() {
    return PollPlugin
  },
  inputProps: {
    mounted: {
      type: 'boolean',
      displayName: 'Mounted',
      default: true
    }
  }
})
