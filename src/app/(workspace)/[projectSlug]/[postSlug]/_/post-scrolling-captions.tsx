import { type Editor, EditorContent } from '@tiptap/react'
import { type MotionStyle, type MotionValue, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useCaptionsOffset } from '~/features/captions/use-captions-offset'
import { useCaptionsPosition } from '~/features/captions/use-captions-position'
import { useCaptionsScrollableHeight } from '~/features/captions/use-captions-scrollable-height'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'
import { usePlaybackProgressScrollSync } from '~/features/playback/use-playback-progress-scroll-sync'
import { motion } from '~/lib/framer-motion/motion'

export function PostScrollingCaptions({ editor }: { editor: Editor }) {
  const playbackProgress = usePlaybackProgress()
  const position = useCaptionsPosition(editor, playbackProgress)
  const offset = useCaptionsOffset(editor, position)

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
            y: offset,
          }}
          ref={contentRef}
        >
          <div className="pointer-events-none absolute top-0 left-0 *:pointer-events-none *:absolute *:bg-gray-6">
            {emptyArrayOfLength.map((_, index) => (
              <PostScrollingCaptionsCursorItem
                // biome-ignore lint/suspicious/noArrayIndexKey: I know what I'm doing
                key={index}
                position={position}
                positionOffset={index}
                containerOffset={containerOffset}
                offset={offset}
                offsetLeft={() => scrollableRef.current?.offsetLeft ?? 0}
                coordsAtPos={(pos) => editor.view.coordsAtPos(pos)}
              />
            ))}
          </div>
          <EditorContent editor={editor} />
        </motion.div>
      </div>
    </motion.div>
  )
}

function PostScrollingCaptionsCursorItem({
  position,
  positionOffset,
  containerOffset,
  offset,
  offsetLeft,
  coordsAtPos,
}: {
  position: MotionValue<number>
  positionOffset: number
  containerOffset: number
  offset: MotionValue<number>
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

    const contentY = offset.get()

    return {
      y: coords.top - contentY - containerOffset,
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
