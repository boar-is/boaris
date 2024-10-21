'use client'

import { useSelector } from '@legendapp/state/react'
import { PostScrollingLayout } from '~/app/(workspace)/[projectSlug]/[postSlug]/_/post-scrolling-layout'
import { useCaptions } from '~/features/captions/use-captions'
import { useCaptionsEditor } from '~/features/captions/use-captions-editor'
import { PlaybackProgressAtomProvider } from '~/features/playback-progress-atom-provider'
import { usePostPage } from '~/features/post/post-page-provider'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
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
      <PlaybackProgressAtomProvider>
        <PostScrollingContent />
      </PlaybackProgressAtomProvider>
    </PostReading>
  )
}

function PostScrollingContent() {
  const result$ = usePostPage()
  const captions = useSelector(result$.captions)
  // remappedCaptions
  const layoutCaptions = useCaptions({ captions })

  if (!layoutCaptions) {
    // TODO implement post without captions
    throw new Error('post without captions is not implemented')
  }

  // just use ordinary useEditor, maybe with default props
  const editor = useCaptionsEditor(
    layoutCaptions.content,
    defaultEditorExtensions,
  )

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
            extensions={defaultEditorExtensions}
          />
        )}
      </div>
      <PostScrollingLayout />
    </div>
  )
}
