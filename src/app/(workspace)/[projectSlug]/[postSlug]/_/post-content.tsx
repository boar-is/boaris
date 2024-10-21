'use client'

import * as M from 'effect/Match'
import { useAtomValue } from 'jotai'
import { useLayoutModeAtom } from '~/features/layout-mode-atom-context'
import { PostScrolling } from './post-scrolling'

export function PostContent() {
  const layoutMode = useAtomValue(useLayoutModeAtom())

  return M.value(layoutMode).pipe(
    M.when('scrolling', () => <PostScrolling />),
    M.orElseAbsurd,
  )
}
