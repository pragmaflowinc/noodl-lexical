import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function Hashtag(props) {
  return <HashtagPlugin />
}

export default defineReactNode({
  name: 'Lexical Hashtag',
  category: 'Lexical',
  getReactComponent() {
    return Hashtag
  }
})
