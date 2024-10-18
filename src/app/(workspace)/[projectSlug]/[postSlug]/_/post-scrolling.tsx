'use client'

import { useSelector } from '@legendapp/state/react'
import { useCaptions } from '~/features/captions/use-captions'
import { PlaybackProgressProvider } from '~/features/playback/playback-progress-provider'
import { usePostPageContext } from '~/features/post/post-page-provider'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading-header'

export function PostScrolling() {
  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
      <PlaybackProgressProvider>
        <PostScrollingContent />
        <PostScrollingContentLayout />
      </PlaybackProgressProvider>
    </PostReading>
  )
}

function PostScrollingContent() {
  const result$ = usePostPageContext()
  const captions = useSelector(result$.captions)
  const layoutCaptions = useCaptions({ captions })

  return <div>captions</div>
}

function PostScrollingContentLayout() {
  return <div>layout</div>
}
