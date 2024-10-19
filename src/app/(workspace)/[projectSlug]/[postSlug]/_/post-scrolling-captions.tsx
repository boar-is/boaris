import { type Editor, EditorContent } from '@tiptap/react'
import {
  type MotionStyle,
  type MotionValue,
  useAnimate,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useCaptionsOffsetTop } from '~/features/captions/use-captions-offset-top'
import { useCaptionsPosition } from '~/features/captions/use-captions-position'
import { useCaptionsScrollableHeight } from '~/features/captions/use-captions-scrollable-height'
import { useCaptionsWordRange } from '~/features/captions/use-captions-word-range'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'
import { usePlaybackProgressScrollSync } from '~/features/playback/use-playback-progress-scroll-sync'
import { type Coords, mergeCoords } from '~/lib/framer-motion/merge-coords'
import { motion } from '~/lib/framer-motion/motion'

export function PostScrollingCaptions({ editor }: { editor: Editor }) {
  const playbackProgress = usePlaybackProgress()
  const position = useCaptionsPosition(editor.state, playbackProgress)
  const offsetTop = useCaptionsOffsetTop(editor.view, position)
  const wordRange = useCaptionsWordRange(editor.state, position)

  const contentRef = useRef<HTMLDivElement | null>(null)

  const scrollableHeight = useCaptionsScrollableHeight({ contentRef })
  const [scrollableRef] = usePlaybackProgressScrollSync({ scrollableHeight })

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
        <div>
          playbackProgress <motion.span>{playbackProgress}</motion.span>
        </div>
        <div>
          position: <motion.span>{position}</motion.span>
        </div>
        <div>
          <button
            type="button"
            onClick={() => position.set(position.get() - 1)}
          >
            dec
          </button>
          <button
            type="button"
            onClick={() => position.set(position.get() + 1)}
          >
            inc
          </button>
        </div>
      </div>
      <div className="sticky inset-x-0 h-0" style={{ top: containerOffset }}>
        <motion.div
          className="relative"
          style={{
            y: offsetTop,
          }}
          ref={contentRef}
        >
          <PostScrollingCaptionsCursor
            coordsAtPos={(pos) => editor.view.coordsAtPos(pos)}
            range={wordRange}
            containerOffset={containerOffset}
            offsetTop={offsetTop}
            offsetLeft={() => scrollableRef.current?.offsetLeft ?? 0}
          />
          {/*<div className="pointer-events-none absolute top-0 left-0 *:pointer-events-none *:absolute *:bg-gray-6">*/}
          {/*  {emptyArrayOfLength.map((_, index) => (*/}
          {/*    <PostScrollingCaptionsCursorItem*/}
          {/*      // biome-ignore lint/suspicious/noArrayIndexKey: I know what I'm doing*/}
          {/*      key={index}*/}
          {/*      position={position}*/}
          {/*      positionOffset={index}*/}
          {/*      containerOffset={containerOffset}*/}
          {/*      offsetTop={offsetTop}*/}
          {/*      offsetLeft={() => scrollableRef.current?.offsetLeft ?? 0}*/}
          {/*      coordsAtPos={(pos) => editor.view.coordsAtPos(pos)}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</div>*/}
          <EditorContent editor={editor} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function PostScrollingCaptionsCursor({
  coordsAtPos,
  range,
  containerOffset,
  offsetTop,
  offsetLeft,
}: {
  coordsAtPos: (pos: number) => Coords
  range: MotionValue<{ start: number; end: number }>
  containerOffset: number
  offsetTop: MotionValue<number>
  offsetLeft: () => number
}) {
  const [scope, animate] = useAnimate()

  useMotionValueEvent(range, 'change', ({ start, end }) => {
    const startCoords = coordsAtPos(start)
    const endCoords = coordsAtPos(end)

    const coords = mergeCoords(startCoords, endCoords)

    animate(
      scope.current,
      {
        y: coords.top - offsetTop.get() - containerOffset,
        x: coords.left - offsetLeft(),
        height: coords.bottom - coords.top,
        width: coords.right - coords.left,
        scaleY: [0.5, 1],
      },
      {
        duration: 0.1,
      },
    )
  })

  return (
    <div
      className="top-0 left-0 pointer-events-none absolute bg-[#1e3a8a] rounded-[0.5rem] border border-[#1d4ed8]"
      ref={scope}
    />
  )
}

function PostScrollingCaptionsCursorItem({
  position,
  positionOffset,
  containerOffset,
  offsetTop,
  offsetLeft,
  coordsAtPos,
}: {
  position: MotionValue<number>
  positionOffset: number
  containerOffset: number
  offsetTop: MotionValue<number>
  offsetLeft: () => number
  coordsAtPos: (pos: number) => {
    left: number
    right: number
    top: number
    bottom: number
  }
}) {
  const style = useTransform((): MotionStyle => {
    const computedPosition = position.get() - positionOffset

    if (computedPosition < 0) {
      return {
        display: 'none',
      }
    }

    const coords = coordsAtPos(computedPosition)
    const nextCoords = coordsAtPos(computedPosition + 1)

    return {
      y: coords.top - offsetTop.get() - containerOffset,
      x: coords.left - offsetLeft(),
      height: coords.bottom - coords.top,
      width: nextCoords.left - coords.left + 1, // +1px to avoid gaps
    }
  })

  const y = useTransform(() => style.get().y)
  const x = useTransform(() => style.get().x)
  const height = useTransform(() => style.get().height)
  const width = useTransform(() => style.get().width)

  return <motion.i style={{ y, x, height, width }} />
}

function PostScrollingContentLayout() {
  return <div className="h-[300dvh]">layout</div>
}
