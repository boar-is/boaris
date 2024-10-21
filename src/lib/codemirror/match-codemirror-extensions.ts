import { javascript } from '@codemirror/lang-javascript'
import * as M from 'effect/Match'

export const matchCodemirrorExtensions = M.type<string>().pipe(
  M.when(
    (it) => /\.(js|cjs|mjs)$/i.test(it),
    () => [javascript()],
  ),
  M.when(
    (it) => /\.(jsx)$/i.test(it),
    () => [javascript({ jsx: true })],
  ),
  M.when(
    (it) => /\.(ts|cts|mts)$/i.test(it),
    () => [javascript({ typescript: true })],
  ),
  M.when(
    (it) => /\.(tsx)$/i.test(it),
    () => [javascript({ typescript: true, jsx: true })],
  ),
  M.orElse(() => []),
)
