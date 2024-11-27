import { type Editor, EditorContent } from '@tiptap/react'
import type { Atom } from 'jotai'
import { type MotionValue, useAnimate, useMotionValueEvent } from 'motion/react'
import { useRef } from 'react'
import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
import { type Coords, mergeCoords } from '~/lib/dom/merge-coords'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { motion } from '~/lib/motion/motion'
import { useAtomAnimatedMotionValue } from '~/lib/motion/use-atom-animated-motion-value'
import { useAtomMotionValue } from '~/lib/motion/use-atom-motion-value'
import { useAtomScrollSyncEffect } from '~/lib/motion/use-atom-scroll-sync-effect'
import { getPositionByProgress } from '~/lib/prosemirror/get-position-by-progress'
import { getWordRangeAtPos } from '~/lib/prosemirror/get-word-range-at-pos'
import { offsetTopAtPos } from '~/lib/prosemirror/offset-top-at-pos'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'

export function PostScrollingCaptions({ editor }: { editor: Editor }) {
  const progressAtom = usePlaybackProgressAtom()

  const getPositionByStateProgress = getPositionByProgress(editor.state)
  const positionAtom = useConstAtom((get) =>
    getPositionByStateProgress(get(progressAtom)),
  )

  const offsetTopAtViewPos = offsetTopAtPos(editor.view)
  const offsetTopMv = useAtomAnimatedMotionValue(positionAtom, {
    duration: 0.8,
    initial: 0,
    mapFn: (position) => {
      const offset = offsetTopAtViewPos(position)
      return offset ? offset * -1 : 0
    },
  })

  const getStateWordRangeAtPos = getWordRangeAtPos(editor.state)
  const wordRangeAtom = useConstAtom((get) =>
    getStateWordRangeAtPos(get(positionAtom)),
  )

  const contentRef = useRef<HTMLDivElement | null>(null)

  const containerRef = useContainerHeightSync({ contentRef })

  useAtomScrollSyncEffect({
    targetRef: containerRef,
    progressAtom,
  })

  const containerOffset = 256

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="sticky inset-x-0 h-0" style={{ top: containerOffset }}>
        <motion.div
          style={{
            // @ts-expect-error @see https://github.com/motiondivision/motion/issues/2887
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
              containerRef.current?.getBoundingClientRect()?.left ?? 0
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

  const startAtom = useConstAtom((get) => get(wordRangeAtom)?.start)
  const endAtom = useConstAtom((get) => get(wordRangeAtom)?.end)

  const rangeAtom = useConstAtom((get) => {
    const start = get(startAtom)
    const end = get(endAtom)
    return start && end && { start, end }
  })

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
