'use client'

import { useSelector } from '@legendapp/state/react'
import { PostScrollingLayout } from '~/app/(workspace)/[projectSlug]/[postSlug]/_/post-scrolling-layout'
import { useCaptions } from '~/features/captions/use-captions'
import { useCaptionsEditor } from '~/features/captions/use-captions-editor'
import { PlaybackProgressProvider } from '~/features/playback/playback-progress-provider'
import { usePostPage } from '~/features/post/post-page-provider'
import { extensions } from '~/lib/text-editor/extensions'
import { StaticEditorContent } from '~/lib/text-editor/static-editor-content'
import {
  PostReading,
  PostReadingHeader,
  PostReadingSeparator,
} from './post-reading'
import { PostScrollingCaptions } from './post-scrolling-captions'

export function PostScrolling() {
  return (
    <PostReading>
      <PostReadingHeader />
      <PostReadingSeparator />
      <PlaybackProgressProvider>
        <PostScrollingContent />
      </PlaybackProgressProvider>
    </PostReading>
  )
}

function PostScrollingContent() {
  const result$ = usePostPage()
  const captions = useSelector(result$.captions)
  const layoutCaptions = useCaptions({ captions })

  if (!layoutCaptions) {
    // TODO implement post without captions
    throw new Error('post without captions is not implemented')
  }

  const editor = useCaptionsEditor(layoutCaptions.content, extensions)

  return (
    <div>
      <div className="mx-auto typography max-w-prose w-full">
        {editor ? (
          <PostScrollingCaptions
            editor={editor}
            interpolation={layoutCaptions.interpolation}
          />
        ) : (
          <StaticEditorContent
            content={layoutCaptions.content}
            extensions={extensions}
          />
        )}
      </div>
      <PostScrollingLayout />
    </div>
  )
}
