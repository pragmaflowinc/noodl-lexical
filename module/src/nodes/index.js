import { NoodlTweetNode } from "./TweetNode";
import { NoodlFigmaNode } from "./FigmaNode";
import { NoodlYouTubeNode } from "./YouTubeNode";
import { NoodlPollNode } from "./PollNode";
import { NoodlMentionNode } from "./MentionsNode";
import {
  NoodlHashtagNode,
  NoodlCodeHighlightNode,
  NoodlAutoLinkNode,
  NoodlCodeNode,
  NoodlLinkNode
} from "./BuiltinNodes";

export const Nodes = [
  NoodlCodeHighlightNode,
  NoodlHashtagNode,
  NoodlAutoLinkNode,
  NoodlCodeNode,
  NoodlLinkNode,
  NoodlTweetNode,
  NoodlFigmaNode,
  NoodlYouTubeNode,
  NoodlMentionNode,
  NoodlPollNode,
];
