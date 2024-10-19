import { tags as t } from '@lezer/highlight'
import { createTheme } from '@uiw/codemirror-themes'

export const codemirrorTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    foreground: '#f0f6fc',
    caret: '#c9d1d9',
    selection: '#003d73',
    selectionMatch: '#003d73',
    lineHighlight: '#36334280',
    gutterBackground: 'transparent',
    gutterForeground: '#6e7781',
  },
  styles: [
    { tag: t.comment, color: '#6272a4' },
    { tag: [t.string, t.special(t.brace)], color: '#f1fa8c' },
    { tag: [t.number, t.self, t.bool, t.null], color: '#bd93f9' },
    { tag: [t.keyword, t.operator], color: '#ff79c6' },
    { tag: [t.definitionKeyword, t.typeName], color: '#ff7b72' },
    { tag: t.definition(t.typeName), color: '#f8f8f2' },
    {
      tag: [
        t.className,
        t.definition(t.propertyName),
        t.function(t.variableName),
        t.attributeName,
      ],
      color: '#50fa7b',
    },
  ],
})
