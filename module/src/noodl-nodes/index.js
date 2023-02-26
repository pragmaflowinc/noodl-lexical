import {
  NoodlFormatText,
  NoodlFormatBlock,
  NoodlOutdentContent,
  NoodlIndentContent,
  NoodlFormatElement,
} from "./BlockFormatActions";
import { NoodlClearAction } from "./ClearAction";
import { NoodlLoadAction } from "./LoadAction";
import { NoodleRegisterActions } from "./RegisterActions";
import SaveAction from "./SaveAction";

export const Actions = [
  NoodlFormatText,
  NoodlFormatBlock,
  NoodleRegisterActions,
  NoodlClearAction,
  NoodlLoadAction,
  NoodlOutdentContent,
  NoodlIndentContent,
  NoodlFormatElement,
  SaveAction,
];
