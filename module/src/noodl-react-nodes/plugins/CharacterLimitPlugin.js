/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */
import { defineReactNode } from '@noodl/noodl-sdk'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import React, { useMemo, useState } from 'react'

import { useCharacterLimit } from '../../hooks/useCharacterLimit'

let textEncoderInstance = null

function textEncoder() {
  if (window.TextEncoder === undefined) {
    return null
  }

  if (textEncoderInstance === null) {
    textEncoderInstance = new window.TextEncoder()
  }

  return textEncoderInstance
}

function utf8Length(text) {
  const currentTextEncoder = textEncoder()

  if (currentTextEncoder === null) {
    // http://stackoverflow.com/a/5515960/210370
    const m = encodeURIComponent(text).match(/%[89ABab]/g)
    return text.length + (m ? m.length : 0)
  }

  return currentTextEncoder.encode(text).length
}

function CharacterLimitPlugin({
  charset = 'UTF-16',
  maxLength
}) {
  const [editor] = useLexicalComposerContext()

  const [remainingCharacters, setRemainingCharacters] = useState(maxLength)

  const characterLimitProps = useMemo(
    () => ({
      remainingCharacters: setRemainingCharacters,
      strlen: (text) => {
        if (charset === 'UTF-8') {
          return utf8Length(text)
        } else if (charset === 'UTF-16') {
          return text.length
        } else {
          throw new Error('Unrecognized charset')
        }
      }
    }),
    [charset]
  )

  useCharacterLimit(editor, maxLength, characterLimitProps)

  return (
    <span
      className={`characters-limit ${remainingCharacters < 0 ? 'characters-limit-exceeded' : ''
        }`}>
      {remainingCharacters}
    </span>
  )
}

export default defineReactNode({
  name: 'Lexical CharacterLimit',
  category: 'Lexical',
  getReactComponent() {
    return CharacterLimitPlugin
  },
  inputProps: {
    maxLength: {
      type: 'number',
      displayName: 'Maximum Length',
      default: 128
    },
    charset: {
      displayName: 'Type',
      type: {
        name: 'enum',
        enums: [{
          label: 'UTF-8',
          value: 'UTF-8'
        }, {
          label: 'UTF-16',
          value: 'UTF-16'
        }]
      },
      default: 'UTF-8'
    }
  }
})
