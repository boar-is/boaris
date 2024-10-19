import { type Editor, EditorContent } from '@tiptap/react'
import {
  type MotionValue,
  useAnimate,
  useMotionValueEvent,
} from 'framer-motion'
import { useRef } from 'react'
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
  range: MotionValue<{ start: number; end: number } | undefined>
  containerOffset: number
  offsetTop: MotionValue<number>
  offsetLeft: () => number
}) {
  const [scope, animate] = useAnimate()

  useMotionValueEvent(range, 'change', (range) => {
    if (!range) {
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
      },
      {
        duration: 0.1,
      },
    )
  })

  return (
    <div
      className="top-0 left-0 pointer-events-none absolute bg-[#1e3a8a]/50 rounded-[0.33rem] border border-[#1d4ed8] z-10"
      ref={scope}
    />
  )
}
