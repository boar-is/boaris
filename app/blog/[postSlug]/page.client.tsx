'use client'

import { transform } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { diffpatcher } from '~/lib/diffpatcher'
import { usePreviousRef } from '~/lib/hooks/use-previous-ref'
import type {
  Layout,
  LayoutContent,
  LayoutMode,
  LayoutValue,
} from '~/lib/model/revision/layout'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { mapSkippedPair } from '~/lib/utils/map-skipped-pair'

export function BlogPostPlayer({ layout }: { layout: Layout | undefined }) {
  if (!layout) {
    return null
  }

  const { width = undefined } = useWindowSize({
    debounceDelay: 250,
  })

  if (!width) {
    return null
  }

  const [currentMode, setCurrentMode] = useState<LayoutMode>('scrolling')

  const override = layout.overrides?.find(
    (it) =>
      !it.disabled &&
      it.modes.includes(currentMode) &&
      (!it?.minWidthPx || width >= it.minWidthPx),
  )

  if (!(layout.primary.modes.includes(currentMode) && override)) {
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

  const getContentIndex = (at: number) =>
    findClosestIndex(layoutValue.changes, at, (it) => it.at)

  const mappedProgress = transformProgress(currentProgress)

  const contentIndex = getContentIndex(mappedProgress)
  const previousContentIndex = usePreviousRef(contentIndex)

  const previousContent = useRef<LayoutContent | null>(null)
  const content = useMemo<LayoutContent>(() => {
    const value: LayoutContent = {}

    if (contentIndex === null) {
      return value
    }

    return value
  }, [contentIndex])
  previousContent.current = content

  return <div>Layout</div>
}
