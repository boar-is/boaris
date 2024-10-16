'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { FunctionReturnType } from 'convex/server'
import { transform } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { diffpatcher } from '~/src/lib/delta/diffpatcher'
import { createStrictContext } from '~/src/lib/react/create-strict-context'

type PageData = NonNullable<FunctionReturnType<typeof api.functions.post.page>>

export type WorkspaceProjectPostState = {
  captions: PageData['captions']
  layouts: PageData['layouts']
  tracks: PageData['tracks']
  windowWidth: number
  scrollYProgress: number
  layoutMode: LayoutMode
  layoutChanges: Array<LayoutChange>
  progressInterpolation: Interpolation
  progress: number
  layoutChangesIndex: () => number | undefined
  layout: Layout
}

export const [WorkspaceProjectPostContext, useWorkspaceProjectPostContext] =
  createStrictContext<Observable<WorkspaceProjectPostState>>({
    name: 'WorkspaceProjectPostContext',
  })

export function WorkspaceProjectPostProvider({
  children,
  data: { captions, layouts, tracks },
}: PropsWithChildren & {
  data: PageData
}) {
  const state$ = useObservable<WorkspaceProjectPostState>({
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
    progress: (): number => {
      const { input, output } = state$.progressInterpolation.peek()
      return transform(state$.scrollYProgress.get(), input, output)
    },
    layoutChangesIndex: (): number | undefined =>
      findClosestIndex(
        state$.layoutChanges.peek(),
        state$.progress.get(),
        (it) => it.at,
      ),
    layout: () => {
      const layoutChanges = state$.layoutChanges.get()
      const index = state$.layoutChangesIndex.get()!

      return layoutChanges[index]?.value!
    },
  } as const)

  return (
    <WorkspaceProjectPostContext.Provider value={state$}>
      {children}
    </WorkspaceProjectPostContext.Provider>
  )
}
