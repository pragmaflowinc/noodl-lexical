import { NoodlFormatParagraphAction, NoodlFormatText } from './BlockFormatActions'
import { NoodlClearAction } from './ClearAction'
import { NoodlLoadAction } from './LoadAction'
import { NoodleRegisterActions } from './RegisterActions'
import SaveAction from './SaveAction'

export const Actions = [NoodlFormatText, NoodleRegisterActions, NoodlClearAction, NoodlLoadAction, SaveAction, NoodlFormatParagraphAction]
