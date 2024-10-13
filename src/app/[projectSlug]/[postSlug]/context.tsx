'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { FunctionReturnType } from 'convex/server'
import { transform } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import type { api } from '~/convex/_generated/api'
import type { LayoutChange, LayoutMode } from '~/convex/fields/revisions'
import { diffpatcher } from '~/src/lib/delta/diffpatcher'
import { createStrictContext } from '~/src/lib/react/create-strict-context'
import { ensureDefined } from '~/utils/ensure-defined'
import { ensureNonNull } from '~/utils/ensure-non-null'
import { findClosestIndex } from '~/utils/find-closest-index'
import { mapSkippedPair } from '~/utils/map-skipped-pair'

type PageData = NonNullable<FunctionReturnType<typeof api.functions.post.page>>

export type WorkspaceProjectPostState = PageData & {
  windowWidth: number
  scrollYProgress: number
  layoutMode: LayoutMode
  layoutChanges: () => Array<LayoutChange>
  progressInterpolation: () => {
    input: Array<number>
    output: Array<number>
  }
  progress: () => number
  layoutChangesIndex: () => number
  layout: () => NonNullable<LayoutChange['value']>
}

export const [WorkspaceProjectPostContext, useWorkspaceProjectPostContext] =
  createStrictContext<Observable<WorkspaceProjectPostState>>({
    name: 'WorkspaceProjectPostContext',
  })

export function WorkspaceProjectPostProvider({
  children,
  data: { post, captions, layouts, tracks },
}: PropsWithChildren & {
  data: PageData
}) {
  const state$ = useObservable({
    post,
    captions: captions && {
      ...captions,
      value: ObservableHint.plain(captions.value),
    },
    layouts: layouts && {
      ...layouts,
      overrides: layouts.overrides?.map((override) => ({
        ...override,
        changesDelta: ObservableHint.plain(override.changesDelta),
      })),
    },
    tracks,
    windowWidth: 0,
    layoutMode: 'scrolling',
    scrollYProgress: 0,
    layoutChanges: () => {
      const override = state$.layouts.overrides.find(
        (it) =>
          it.modes.includes(state$.layoutMode) &&
          (!it.minWidthPx || state$.windowWidth >= it.minWidthPx),
      )

      const primaryLayoutChanges = state$.layouts.primary.changes.get()
      const layoutChanges = override
        ? (diffpatcher.patch(
            primaryLayoutChanges,
            override.changesDelta.get(),
          ) as Array<LayoutChange>)
        : primaryLayoutChanges

      return layoutChanges ?? []
    },
    progressInterpolation: () => {
      const i: Array<number> = []
      const o: Array<boolean> = []
      for (const change of state$.layoutChanges.get(true)) {
        i.push(change.at)
        o.push(!!change.value)
      }
      const [input, output] = mapSkippedPair(i, o)
      return {
        input,
        output,
      }
    },
    progress: () => {
      const { input, output } = state$.progressInterpolation.peek()
      return transform(state$.scrollYProgress.get(), input, output)
    },
    layoutChangesIndex: () =>
      ensureNonNull(
        findClosestIndex(
          state$.layoutChanges.peek(),
          state$.progress.get(),
          (it) => it.at,
        ),
      ),
    layout: () => {
      const layoutChanges = state$.layoutChanges.get()
      const index = state$.layoutChangesIndex.get()

      return ensureDefined(layoutChanges[index]?.value)
    },
  } as const)

  return (
    <WorkspaceProjectPostContext.Provider value={state$}>
      {children}
    </WorkspaceProjectPostContext.Provider>
  )
}
