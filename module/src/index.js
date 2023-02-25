import { defineModule } from './noodl-sdk'
import { ComposerReactNode } from './noodl-react-nodes/Composer'
import { Actions } from './noodl-nodes'
import { Plugins } from './noodl-react-nodes/plugins'
import EditorState from './noodl-react-nodes/EditorState'
import RegistrationNodes from './nodes/RegistrationNodes'
import { Nodes } from './nodes'

defineModule({
  reactNodes: [
    ComposerReactNode,
    EditorState,
    ...Plugins
  ],
  nodes: [
    RegistrationNodes,
    ...Actions,
    ...Nodes
  ],
  setup() {
    // this is called once on startup
  }
})
