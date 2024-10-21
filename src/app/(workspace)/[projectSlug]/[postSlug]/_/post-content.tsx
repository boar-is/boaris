'use client'

import { Match } from 'effect'
import { PostScrolling } from './post-scrolling'

export const PostContent = function PostContent() {
  return Match.value(layoutMode).pipe(
    Match.when('scrolling', () => <PostScrolling />),
    Match.orElseAbsurd,
  )
}
