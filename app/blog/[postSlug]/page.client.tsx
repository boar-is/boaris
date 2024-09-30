'use client'

import { AnimatePresence, m, transform } from 'framer-motion'
import { Fragment, useMemo, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { diffpatcher } from '~/lib/diffpatcher'
import { useLayoutContent } from '~/lib/hooks/use-layout-content'
import type { Track } from '~/lib/model/docs/revisions'
import type {
  Layout,
  LayoutGrid,
  LayoutMode,
  LayoutValue,
} from '~/lib/model/revision/layout'
import { ensureNonNull } from '~/lib/utils/ensure'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { mapSkippedPair } from '~/lib/utils/map-skipped-pair'

export function BlogPostPlayer({
  tracks,
  layout,
}: { tracks: Array<Track>; layout: Layout | undefined }) {
  if (!layout) {
    return null
  }

  const { width } = useWindowSize({
    debounceDelay: 250,
  })

  const [currentMode, setCurrentMode] = useState<LayoutMode>('scrolling')

  const override = layout.overrides?.find(
    (it) =>
      !it.disabled &&
      it.modes.includes(currentMode) &&
      (!it?.minWidthPx || width >= it.minWidthPx),
  )

  if (!layout.primary.modes.includes(currentMode)) {
    return null
  }

  const layoutValue = override
    ? (diffpatcher.patch(layout.primary, override.delta) as LayoutValue)
    : layout.primary.value

  const transformProgress = useMemo(() => {
    const inputs: Array<number> = []
    const outputs: Array<boolean> = []
    for (const change of layoutValue.changes) {
      inputs.push(change.at)
      outputs.push(change.value.type !== 'skip')
    }
    return transform(...mapSkippedPair(inputs, outputs))
  }, [layoutValue.changes])

  const [currentProgress, setCurrentProgress] = useState(0)

  const mappedProgress = transformProgress(currentProgress)

  const contentIndex = ensureNonNull(
    findClosestIndex(layoutValue.changes, mappedProgress, (it) => it.at),
  )

  const layoutContent = useLayoutContent(layoutValue, contentIndex)

  return (
    <>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={currentProgress}
        onChange={(e) => setCurrentProgress(+e.target.value)}
      />
      {layoutContent.main && (
        <LayoutMainGrid tracks={tracks} grid={layoutContent.main} />
      )}
    </>
  )
}

function LayoutMainGrid({
  tracks,
  grid: { areas },
}: { tracks: Array<Track>; grid: LayoutGrid }) {
  const areasSet = new Set(areas.flat())
  const filteredTracks = tracks.filter((it) => areasSet.has(it._id))
  const areasVar = areas.map((row) => `'${row.join(' ')}'`).join(' ')

  return (
    <div
      className="grid h-full gap-2"
      style={{
        gridTemplateAreas: areasVar,
      }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTracks.map((it) => (
          <m.div
            key={it._id}
            className="bg-gray-2 rounded-lg"
            style={{ gridArea: it._id }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {it._id}
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
