import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { validateUrl } from '../../utils/url'
import React from 'react'
import { defineReactNode } from '@noodl/noodl-sdk'

function LexicalLink(props) {
  return <LexicalLinkPlugin validateUrl={validateUrl} />
}

export default defineReactNode({
  name: 'Lexical Link',
  category: 'Lexical',
  getReactComponent() {
    return LexicalLink
  }
})
