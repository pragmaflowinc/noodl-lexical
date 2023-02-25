import { defineReactNode } from '@noodl/noodl-sdk'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useSettings } from '../../context/SettingsContext'
import Placeholder from '../../ui/Placeholder'
import React, { useEffect } from 'react'

function RichText({ placeholder, readOnly, ...rest }) {
  const [settings, settingsDispatcher] = useSettings()
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    editor.setEditable(!readOnly)
  }, [readOnly, editor])
  return <RichTextPlugin
    contentEditable={
      <div className="editor-scroller">
        <div className="editor" ref={(_floatingAnchorElem) => {
          if (_floatingAnchorElem !== null && !settings.editableContentRef) {
            settingsDispatcher({
              type: 'setEditableContentRef',
              editableContentRef: _floatingAnchorElem
            })
          }
        }}>
          <ContentEditable />
        </div>
      </div>
    }
    placeholder={<Placeholder>{placeholder}</Placeholder>}
    ErrorBoundary={LexicalErrorBoundary}
  />
}

export default defineReactNode({
  name: 'Lexical RichText',
  category: 'Lexical',
  getReactComponent() {
    return RichText
  },
  inputProps: {
    placeholder: {
      type: 'string', /* can be JSX or something in the future */
      displayName: 'Placeholder',
      default: ''
    },
    readOnly: {
      type: 'boolean',
      displayName: 'Read-only',
      default: false
    }
  }
})
