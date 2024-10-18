'use client'

import { PlaybackProgressProvider } from '~/features/playback/playback-progress-provider'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading-header'

export function PostScrollingContent() {
  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
      <PlaybackProgressProvider>1</PlaybackProgressProvider>
    </PostReading>
  )
}
