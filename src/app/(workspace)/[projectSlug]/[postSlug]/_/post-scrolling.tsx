'use client'

import { reactive, useObservable, useSelector } from '@legendapp/state/react'
import { type Editor, EditorContent } from '@tiptap/react'
import { type MutableRefObject, useRef } from 'react'
import { useCaptions } from '~/features/captions/use-captions'
import { useCaptionsCursorOffset$ } from '~/features/captions/use-captions-cursor-offset'
import { useCaptionsEditor } from '~/features/captions/use-captions-editor'
import { useCaptionsPosition$ } from '~/features/captions/use-captions-position'
import { useCaptionsScrollableHeight$ } from '~/features/captions/use-captions-scrollable-height'
import {
  PlaybackProgressProvider,
  usePlaybackProgress$,
} from '~/features/playback/playback-progress-provider'
import { usePlaybackProgressScrollSync } from '~/features/playback/use-playback-progress-scroll-sync'
import { usePostPageContext } from '~/features/post/post-page-provider'
import { motion } from '~/lib/framer-motion/motion'
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

  return (
    <div className="typography max-w-prose w-full">
      {editor ? (
        <PostScrollingContentCaptions
          editor={editor}
          scrollableRef={scrollableRef}
        />
      ) : (
        <StaticEditorContent
          content={layoutCaptions.content}
          extensions={extensions}
        />
      )}
    </div>
  )
}

const ReactiveMotionDiv = reactive(motion.div)

function PostScrollingContentCaptions({
  editor,
  scrollableRef,
}: { editor: Editor; scrollableRef: MutableRefObject<HTMLDivElement | null> }) {
  const playbackProgress$ = usePlaybackProgress$()
  const position$ = useCaptionsPosition$(editor, playbackProgress$)
  const contentOffset$ = useCaptionsCursorOffset$(editor, position$)
  const contentAnimate$ = useObservable<{ y: number } | undefined>(() => {
    const offset = contentOffset$.get()
    return offset && { y: offset * -1 + 144 }
  })

  const contentRef = useRef<HTMLDivElement | null>(null)
  const scrollableHeight$ = useCaptionsScrollableHeight$({ contentRef })

  return (
    <ReactiveMotionDiv
      className="relative w-full"
      $style={() => ({ height: scrollableHeight$.get() })}
      ref={scrollableRef}
    >
      <div className="sticky top-0 inset-x-0 h-0">
        <ReactiveMotionDiv
          $animate={contentAnimate$}
          transition={{ duration: 0.8 }}
          ref={contentRef}
        >
          <EditorContent editor={editor} />
        </ReactiveMotionDiv>
      </div>
    </ReactiveMotionDiv>
  )
}

function PostScrollingContentLayout() {
  return <div>layout</div>
}
