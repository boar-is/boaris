import { type Editor, EditorContent } from '@tiptap/react'
import {
  type MotionValue,
  useAnimate,
  useMotionValueEvent,
} from 'framer-motion'
import { useRef } from 'react'
import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { useCaptionsOffsetTop } from '~/features/captions/use-captions-offset-top'
import { useCaptionsPosition } from '~/features/captions/use-captions-position'
import { useCaptionsProgress } from '~/features/captions/use-captions-progress'
import { useCaptionsScrollableHeight } from '~/features/captions/use-captions-scrollable-height'
import { useCaptionsWordRange } from '~/features/captions/use-captions-word-range'
import { usePlaybackProgress } from '~/features/playback-progress-atom-provider'
import { usePlaybackProgressScrollSync } from '~/features/use-playback-progress-scroll-sync'
import { type Coords, mergeCoords } from '~/lib/framer-motion/merge-coords'
import { motion } from '~/lib/framer-motion/motion'

export function PostScrollingCaptions({
  editor,
  interpolation,
}: { editor: Editor; interpolation: Interpolation | undefined }) {
  const playbackProgress = usePlaybackProgress()
  // getCaptionsProgress
  const progress = useCaptionsProgress({ playbackProgress, interpolation })
  // getPositionByProgress
  const position = useCaptionsPosition(editor.state, progress)
  // useAtomAnimatedMotionValue, but * -1, check for undefined if so, duration 0.8
  const offsetTop = useCaptionsOffsetTop(editor.view, position)
  // useComputedMotionValue + get-sequential-word-range
  const wordRange = useCaptionsWordRange(editor.state, position)

  const contentRef = useRef<HTMLDivElement | null>(null)

  // useFactoredHeight
  const scrollableHeight = useCaptionsScrollableHeight({ contentRef })
  const [scrollableRef] = usePlaybackProgressScrollSync({ scrollableHeight })

  const containerOffset = 128

  return (
    <div
      className="relative w-full"
      style={{ height: scrollableHeight }}
      ref={scrollableRef}
    >
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
          <EditorContent editor={editor} />
        </motion.div>
      </div>
    </div>
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
  range: MotionValue<{ start: number; end: number } | undefined>
  containerOffset: number
  offsetTop: MotionValue<number>
  offsetLeft: () => number
}) {
  const [scope, animate] = useAnimate()

  useMotionValueEvent(range, 'change', (range) => {
    if (!range) {
      animate(scope.current, {
        opacity: [1, 0],
      })
      return
    }

    const startCoords = coordsAtPos(range.start)
    const endCoords = coordsAtPos(range.end)

    const coords = mergeCoords(startCoords, endCoords)

    animate(
      scope.current,
      {
        y: coords.top - offsetTop.get() - containerOffset,
        x: coords.left - offsetLeft(),
        height: coords.bottom - coords.top,
        width: coords.right - coords.left,
        scale: [0.75, 1.1],
        filter: ['blur(8px)', 'blur(0px)'],
        opacity: 1,
      },
      {
        duration: 0.1666,
      },
    )
  })

  return (
    <div
      className="top-0 left-0 pointer-events-none absolute bg-[#1e3a8a]/50 backdrop-brightness-150 rounded-[0.33rem] border border-[#1d4ed8]/75 z-10 opacity-0"
      ref={scope}
    />
  )
}
