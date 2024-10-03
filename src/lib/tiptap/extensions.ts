import { Bold } from '@tiptap/extension-bold'
import { BulletList } from '@tiptap/extension-bullet-list'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Code } from '@tiptap/extension-code'
import { Document } from '@tiptap/extension-document'
import { HardBreak } from '@tiptap/extension-hard-break'
import { History } from '@tiptap/extension-history'
import { Italic } from '@tiptap/extension-italic'
import { Link } from '@tiptap/extension-link'
import { ListItem } from '@tiptap/extension-list-item'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Strike } from '@tiptap/extension-strike'
import { Text } from '@tiptap/extension-text'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import type { Extensions } from '@tiptap/react'
import { Heading } from './heading'

export const extensions = [
  Bold,
  BulletList,
  CharacterCount,
  Code.configure({
    HTMLAttributes: {
      spellCheck: false,
    },
  }),
  Document,
  HardBreak,
  Heading.configure({
    offset: 1,
  }),
  History,
  Italic,
  Link.configure({
    defaultProtocol: 'https',
    // TODO Only href should go to attrs
    // HTMLAttributes: {
    //   rel: 'noopener noreferrer ugc',
    // },
  }),
  ListItem,
  OrderedList,
  Paragraph,
  Placeholder.configure({
    placeholder: 'Write something, or press ‘/‘ for commands...',
  }),
  Strike,
  Text,
  // TODO occasional textStyle on copy
  TextStyle,
  Typography,
] satisfies Extensions
