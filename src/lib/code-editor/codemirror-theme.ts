import { tags as t } from '@lezer/highlight'
import { createTheme } from '@uiw/codemirror-themes'

export const codemirrorTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    foreground: '#BCBEC4',
    caret: '#c9d1d9',
    selection: '#003d73',
    selectionMatch: '#003d73',
    lineHighlight: '#36334280',
    gutterBackground: 'transparent',
    gutterForeground: '#6e7781',
  },
  styles: [
    { tag: [t.standard(t.tagName), t.tagName], color: '#2FBAA3' },
    { tag: [t.comment], color: '#7A7E85' },
    { tag: [t.bracket], color: '#BCBEC4' },
    { tag: [t.propertyName], color: '#56A8F5' },
    { tag: [t.number], color: '#2AACB8' },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: '#CF8E6D',
    },
    { tag: [t.string, t.meta, t.regexp], color: '#a5d6ff' },
    { tag: [t.quote], color: '#7ee787' },
    { tag: [t.heading, t.strong], color: '#d2a8ff', fontWeight: 'bold' },
    { tag: [t.emphasis], color: '#d2a8ff', fontStyle: 'italic' },
    { tag: [t.deleted], color: '#ffdcd7', backgroundColor: 'ffeef0' },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: '#ffab70' },
    { tag: t.link, textDecoration: 'underline' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.invalid, color: '#f97583' },
  ],
})
