import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { Match } from 'effect'

export const matchCodemirrorExtensions = Match.type<string>().pipe(
  Match.when(
    (it) => /\.(html)$/i.test(it),
    () => [html()],
  ),
  Match.when(
    (it) => /\.(js|cjs|mjs)$/i.test(it),
    () => [javascript()],
  ),
  Match.when(
    (it) => /\.(jsx)$/i.test(it),
    () => [javascript({ jsx: true })],
  ),
  Match.when(
    (it) => /\.(ts|cts|mts)$/i.test(it),
    () => [javascript({ typescript: true })],
  ),
  Match.when(
    (it) => /\.(tsx)$/i.test(it),
    () => [javascript({ typescript: true, jsx: true })],
  ),
  Match.orElse(() => []),
)
