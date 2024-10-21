'use client'

import { observer } from '@legendapp/state/react'
import { Match } from 'effect'
import { useLayoutModeAtom } from '~/features/layout/layout-mode-atom-provider'
import { PostScrolling } from './post-scrolling'

export const PostContent = observer(function PostContent() {
  const layoutModeAtom = useLayoutModeAtom()

  return Match.value(layoutMode$.get()).pipe(
    Match.when('scrolling', () => <PostScrolling />),
    Match.orElseAbsurd,
  )
})
