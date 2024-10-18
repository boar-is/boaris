'use client'

import { observer } from '@legendapp/state/react'
import { Match } from 'effect'
import { useLayoutMode$ } from '~/features/layout/layout-mode-provider'
import { PostScrollingContent } from './_post-scrolling-content'

export const PostContent = observer(function PostContent() {
  const layoutMode$ = useLayoutMode$()

  return Match.value(layoutMode$.get()).pipe(
    Match.when('scrolling', () => <PostScrollingContent />),
    Match.orElseAbsurd,
  )
})
