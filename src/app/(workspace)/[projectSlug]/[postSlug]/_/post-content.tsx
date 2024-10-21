'use client'

import { observer } from '@legendapp/state/react'
import { Match } from 'effect'
import { useLayoutMode } from '~/features/layout/layout-mode-provider'
import { PostScrolling } from './post-scrolling'

export const PostContent = observer(function PostContent() {
  const layoutModeAtom = useLayoutMode()

  return Match.value(layoutMode$.get()).pipe(
    Match.when('scrolling', () => <PostScrolling />),
    Match.orElseAbsurd,
  )
})
