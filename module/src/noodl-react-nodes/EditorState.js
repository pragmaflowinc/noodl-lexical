import { useEffect } from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function EditorState(props) {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    if (editor) {
      props.onDidMount(editor)
    }
  }, [editor])
  return null
}

export default defineReactNode({
  name: 'Lexical EditorState',
  category: 'Lexical',
  getReactComponent() {
    return EditorState
  },
  initialize() {
    this.props.onDidMount = domElement => {
      this.setOutputs({ editorRef: domElement })
      this.sendSignalOnOutput('editorSet')
    }
  },
  outputs: {
    editorRef: {
      type: 'object',
      displayName: 'Editor Ref'
    },
    editorSet: {
      type: 'signal',
      displayName: 'Ref ready'
    }
  }
})
