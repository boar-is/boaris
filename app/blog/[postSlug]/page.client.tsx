'use client'

import { Match } from 'effect'
import { transform } from 'framer-motion'
import { Fragment, useMemo, useState } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { useWindowSize } from 'usehooks-ts'
import { diffpatcher } from '~/lib/diffpatcher'
import { useLayoutContent } from '~/lib/hooks/use-layout-content'
import type {
  Layout,
  LayoutGroup,
  LayoutMode,
  LayoutValue,
} from '~/lib/model/revision/layout'
import { ensureNonNull } from '~/lib/utils/ensure'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { mapSkippedPair } from '~/lib/utils/map-skipped-pair'

const directionMap = {
  h: 'horizontal',
  v: 'vertical',
} as const

export function BlogPostPlayer({ layout }: { layout: Layout | undefined }) {
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
        <div className="border border-gray-5 rounded-2xl h-full">
          <LayoutGroupPanel group={layoutContent.main} />
        </div>
      )}
    </>
  )
}

const matchLayoutItem = Match.type<LayoutGroup['content'][number]>().pipe(
  Match.tag('LayoutGroup', (it) => <LayoutGroupPanel group={it} />),
  Match.tag('LayoutItem', (it) => <div className="p-4">{it.trackId}</div>),
  Match.exhaustive,
)

function LayoutGroupPanel({
  group: { direction, content },
}: { group: LayoutGroup }) {
  return (
    <PanelGroup direction={directionMap[direction]}>
      {content.map((item, index) => (
        <Fragment key={item._id}>
          <Panel id={item._id} order={index}>
            {matchLayoutItem(item)}
          </Panel>
          {index < content.length - 1 && (
            <PanelResizeHandle className="self-stretch bg-gray-5 data-[panel-group-direction=horizontal]:w-px data-[panel-group-direction=vertical]:h-px" />
          )}
        </Fragment>
      ))}
    </PanelGroup>
  )
}
