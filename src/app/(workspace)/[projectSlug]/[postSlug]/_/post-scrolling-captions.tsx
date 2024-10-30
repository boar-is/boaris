import { type Editor, EditorContent } from '@tiptap/react'
import {
  type MotionValue,
  useAnimate,
  useMotionValueEvent,
} from 'framer-motion'
import { type Atom, atom } from 'jotai'
import { useRef } from 'react'
import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
import { usePlaybackProgressScrollSync } from '~/features/use-playback-progress-scroll-sync'
import { type Coords, mergeCoords } from '~/lib/framer-motion/merge-coords'
import { motion } from '~/lib/framer-motion/motion'
import { useAtomAnimatedMotionValue } from '~/lib/framer-motion/use-atom-animated-motion-value'
import { useAtomMotionValue } from '~/lib/framer-motion/use-atom-motion-value'
import { getPositionByProgress } from '~/lib/prosemirror/get-position-by-progress'
import { getWordRangeAtPos } from '~/lib/prosemirror/get-word-range-at-pos'
import { offsetTopAtPos } from '~/lib/prosemirror/offset-top-at-pos'
import { useConstant } from '~/lib/react/use-constant'
import { useFactoredHeight } from '~/lib/react/use-factored-height'

export function PostScrollingCaptions({ editor }: { editor: Editor }) {
  const progressAtom = usePlaybackProgressAtom()

  const positionAtom = useConstant(() => {
    const getPositionByStateProgress = getPositionByProgress(editor.state)
    return atom((get) => getPositionByStateProgress(get(progressAtom)))
  })

  const offsetTopAtViewPos = offsetTopAtPos(editor.view)
  const offsetTopMv = useAtomAnimatedMotionValue(positionAtom, {
    duration: 0.8,
    initial: 0,
    mapFn: (position) => {
      const offset = offsetTopAtViewPos(position)
      return offset ? offset * -1 : 0
    },
  })

  const wordRangeAtom = useConstant(() => {
    const getStateWordRangeAtPos = getWordRangeAtPos(editor.state)
    return atom((get) => getStateWordRangeAtPos(get(positionAtom)))
  })

  const contentRef = useRef<HTMLDivElement | null>(null)

  const scrollableHeight = useFactoredHeight(contentRef, 1 / 30)
  const [scrollableRef] = usePlaybackProgressScrollSync({ scrollableHeight })

  const containerOffset = 256

  return (
    <div
      className="relative w-full"
      style={{ height: scrollableHeight }}
      ref={scrollableRef}
    >
      <div className="sticky inset-x-0 h-0" style={{ top: containerOffset }}>
        <motion.div
          style={{
            y: offsetTopMv,
          }}
          ref={contentRef}
        >
          <PostScrollingCaptionsCursor
            coordsAtPos={(pos) => editor.view.coordsAtPos(pos)}
            wordRangeAtom={wordRangeAtom}
            containerOffset={containerOffset}
            offsetTopMv={offsetTopMv}
            offsetLeft={() =>
              scrollableRef.current?.getBoundingClientRect()?.left ?? 0
            }
          />
          <EditorContent editor={editor} />
        </motion.div>
      </div>
    </div>
  )
}

function PostScrollingCaptionsCursor({
  coordsAtPos,
  wordRangeAtom,
  containerOffset,
  offsetTopMv,
  offsetLeft,
}: {
  coordsAtPos: (pos: number) => Coords
  wordRangeAtom: Atom<{ start: number; end: number } | undefined>
  containerOffset: number
  offsetTopMv: MotionValue<number>
  offsetLeft: () => number
}) {
  const [scope, animate] = useAnimate()

  const [startAtom, endAtom] = useConstant(
    () =>
      [
        atom((get) => get(wordRangeAtom)?.start),
        atom((get) => get(wordRangeAtom)?.end),
      ] as const,
  )

  const rangeAtom = useConstant(() =>
    atom((get) => {
      const start = get(startAtom)
      const end = get(endAtom)
      return start && end && { start, end }
    }),
  )

  const range = useAtomMotionValue(rangeAtom, undefined)

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
        y: coords.top - offsetTopMv.get() - containerOffset,
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
