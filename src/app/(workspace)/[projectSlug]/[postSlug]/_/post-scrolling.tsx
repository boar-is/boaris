'use client'

import type { Observable } from '@legendapp/state'
import {
  Memo,
  Reactive,
  reactive,
  useObservable,
  useSelector,
} from '@legendapp/state/react'
import { type Editor, EditorContent } from '@tiptap/react'
import { type CSSProperties, useMemo, useRef } from 'react'
import { useCaptions } from '~/features/captions/use-captions'
import { useCaptionsEditor } from '~/features/captions/use-captions-editor'
import { useCaptionsOffset$ } from '~/features/captions/use-captions-offset'
import { useCaptionsPosition$ } from '~/features/captions/use-captions-position'
import { useCaptionsScrollableHeight } from '~/features/captions/use-captions-scrollable-height'
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
} from './post-reading'

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

  const editor = useCaptionsEditor(layoutCaptions.content, extensions)

  return (
    <div className="typography max-w-prose w-full">
      {editor ? (
        <PostScrollingContentCaptions editor={editor} />
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

function PostScrollingContentCaptions({ editor }: { editor: Editor }) {
  const playbackProgress$ = usePlaybackProgress$()
  const position$ = useCaptionsPosition$(editor, playbackProgress$)
  const offset$ = useCaptionsOffset$(editor, position$)

  const [scrollableRef] = usePlaybackProgressScrollSync()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const scrollableHeight = useCaptionsScrollableHeight({ contentRef })

  const cursorLength = 25
  const emptyArrayOfLength = useMemo(
    () => Array.from({ length: cursorLength }),
    [],
  )

  const containerOffset = 128

  return (
    <motion.div
      className="relative w-full"
      style={{ height: scrollableHeight }}
      ref={scrollableRef}
    >
      <div className="fixed bottom-4 left-4">
        <Memo>{playbackProgress$}</Memo>
        <div>
          <Reactive.input type="number" $value={position$} />
        </div>
      </div>
      <div className="sticky inset-x-0 h-0" style={{ top: containerOffset }}>
        <ReactiveMotionDiv
          className="relative"
          $animate={() => ({
            y: offset$.get(),
          })}
          transition={{ duration: 0.8 }}
          ref={contentRef}
        >
          <div className="pointer-events-none absolute top-0 left-0 *:pointer-events-none *:absolute *:bg-gray-6">
            {emptyArrayOfLength.map((_, index) => (
              <PostScrollingContentCursorItem
                // biome-ignore lint/suspicious/noArrayIndexKey: I know what I'm doing
                key={index}
                position$={position$}
                positionOffset={index}
                containerOffset={containerOffset}
                offset$={offset$}
                offsetLeft={() => scrollableRef.current?.offsetLeft ?? 0}
                coordsAtPos={(pos) => editor.view.coordsAtPos(pos)}
              />
            ))}
          </div>
          <EditorContent editor={editor} />
        </ReactiveMotionDiv>
      </div>
    </motion.div>
  )
}

function PostScrollingContentCursorItem({
  position$,
  positionOffset,
  containerOffset,
  offset$,
  offsetLeft,
  coordsAtPos,
}: {
  position$: Observable<number>
  positionOffset: number
  containerOffset: number
  offset$: Observable<number>
  offsetLeft: () => number
  coordsAtPos: (pos: number) => {
    left: number
    right: number
    top: number
    bottom: number
  }
}) {
  const style$ = useObservable((): CSSProperties => {
    const computedPosition = position$.get() - positionOffset

    if (computedPosition < 0) {
      return {
        display: 'none',
      }
    }

    const coords = coordsAtPos(computedPosition)
    const nextCoords = coordsAtPos(computedPosition + 1)

    const contentY = offset$.get()

    return {
      top: coords.top - contentY - containerOffset,
      left: coords.left - offsetLeft(),
      height: coords.bottom - coords.top,
      width: nextCoords.left - coords.left + 1, // +1px to avoid gaps
    }
  })

  return <Reactive.i $style={style$} />
}

function PostScrollingContentLayout() {
  return <div>layout</div>
}
