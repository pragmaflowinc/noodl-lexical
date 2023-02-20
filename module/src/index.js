import { defineModule } from '@noodl/noodl-sdk'
import { ComposerReactNode } from './noodl-react-nodes/Composer'
import { Actions } from './noodl-nodes'
import { Plugins } from './noodl-react-nodes/plugins'
import EditorState from './noodl-react-nodes/EditorState'
defineModule({
  reactNodes: [
    ComposerReactNode,
    EditorState,
    ...Plugins
  ],
  nodes: [
    ...Actions
  ],
  setup() {
    // this is called once on startup
  }
})
