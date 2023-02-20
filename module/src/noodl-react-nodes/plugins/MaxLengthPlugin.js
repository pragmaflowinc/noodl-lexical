import { defineReactNode } from '@noodl/noodl-sdk'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { trimTextContentFromAnchor } from '@lexical/selection'
import { $restoreEditorState } from '@lexical/utils'
import { $getSelection, $isRangeSelection, RootNode } from 'lexical'
import { useEffect } from 'react'

function MaxLength(props) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    let lastRestoredEditorState = null
    return editor.registerNodeTransform(RootNode, (rootNode) => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
        return
      }
      const prevEditorState = editor.getEditorState()
      const prevTextContent = prevEditorState.read(() =>
        rootNode.getTextContent()
      )
      const textContent = rootNode.getTextContent()
      if (prevTextContent !== textContent) {
        const textLength = textContent.length
        const delCount = textLength - props.maxLength
        const anchor = selection.anchor

        if (delCount > 0) {
          // Restore the old editor state instead if the last
          // text content was already at the limit.
          if (
            prevTextContent.length === props.maxLength &&
            lastRestoredEditorState !== prevEditorState
          ) {
            lastRestoredEditorState = prevEditorState
            $restoreEditorState(editor, prevEditorState)
          } else {
            trimTextContentFromAnchor(editor, anchor, delCount)
          }
        }
      }
    })
  }, [editor, props.maxLength])

  return null
}

export default defineReactNode({
  name: 'Lexical Max Length',
  category: 'Lexical',
  getReactComponent() {
    return MaxLength
  },
  inputProps: {
    maxLength: {
      type: 'number',
      displayName: 'Maximum Length'
    }
  }
})
