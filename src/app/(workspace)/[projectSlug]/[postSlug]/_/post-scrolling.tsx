'use client'

import { useSelector } from '@legendapp/state/react'
import type { Editor } from '@tiptap/react'
import type { MutableRefObject } from 'react'
import { useCaptions } from '~/features/captions/use-captions'
import { useCaptionsEditor } from '~/features/captions/use-captions-editor'
import { useCaptionsPosition$ } from '~/features/captions/use-captions-position'
import {
  PlaybackProgressProvider,
  usePlaybackProgress$,
} from '~/features/playback/playback-progress-provider'
import { usePlaybackProgressScrollSync } from '~/features/playback/use-playback-progress-scroll-sync'
import { usePostPageContext } from '~/features/post/post-page-provider'
import { extensions } from '~/lib/text-editor/extensions'
import { StaticEditorContent } from '~/lib/text-editor/static-editor-content'
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

  if (!layoutCaptions) {
    // TODO implement post without captions
    throw new Error('post without captions is not implemented')
  }

  const [scrollableRef] = usePlaybackProgressScrollSync()
  const editor = useCaptionsEditor(layoutCaptions.content, extensions)

  return editor ? (
    <PostScrollingContentCaptions
      editor={editor}
      scrollableRef={scrollableRef}
    />
  ) : (
    <StaticEditorContent
      content={layoutCaptions.content}
      extensions={extensions}
    />
  )
}

function PostScrollingContentCaptions({
  editor,
  scrollableRef,
}: { editor: Editor; scrollableRef: MutableRefObject<HTMLDivElement | null> }) {
  const playbackProgress$ = usePlaybackProgress$()
  const captionsPosition$ = useCaptionsPosition$(editor, playbackProgress$)

  return <div>1</div>
}

function PostScrollingContentLayout() {
  return <div>layout</div>
}
