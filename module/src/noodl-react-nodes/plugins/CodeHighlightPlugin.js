import { defineReactNode } from '@noodl/noodl-sdk'
import { registerCodeHighlighting } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

function CodeHighlightPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return registerCodeHighlighting(editor)
  }, [editor])

  return null
}

export default defineReactNode({
  name: 'Lexical CodeHighlight',
  category: 'Lexical',
  getReactComponent() {
    return CodeHighlightPlugin
  }
})
