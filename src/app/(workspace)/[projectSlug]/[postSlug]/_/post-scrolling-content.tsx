'use client'

import { observer } from '@legendapp/state/react'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading-header'

export const PostScrollingContent = observer(function PostScrollingContent() {
  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
    </PostReading>
  )
})
