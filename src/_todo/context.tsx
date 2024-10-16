'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { transform } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import type { PostPageQueryResult } from '~/convex/queries/postPage'
import type { Interpolation } from '~/convex/values/_shared/interpolation'
import type { Layout } from '~/convex/values/revisions/layouts/layout'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import { applyOverride } from '~/features/layout/apply-override'
import { determineOverride } from '~/features/layout/determine-override'
import { playbackProgressInterpolationFromChanges } from '~/features/layout/playback-progress-interpolation-from-changes'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { findClosestIndex } from '~/lib/utils/find-closest-index'

type PageData = NonNullable<PostPageQueryResult>

export type WorkspaceProjectPostState = {
  captions: PageData['captions']
  layouts: PageData['layouts']
  tracks: PageData['tracks']
  windowWidth: number
  scrollYProgress: number
  layoutMode: LayoutMode
  layoutChanges: Array<LayoutChange>
  playbackProgressInterpolation: Interpolation
  progress: number
  layoutChangesIndex: () => number | null
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
      const layouts = state$.layouts.get()

      if (!layouts) {
        return []
      }

      const override = determineOverride({
        currentLayoutMode: state$.layoutMode.get(),
        primaryLayoutModes: layouts.primary.modes,
        overrides: layouts.overrides,
        width: state$.windowWidth.get(),
        includeDisabled: false,
      })

      return (
        applyOverride({
          changes: layouts.primary.changes,
          override,
        }) ?? []
      )
    },
    playbackProgressInterpolation: () =>
      playbackProgressInterpolationFromChanges(state$.layoutChanges.get(true)),
    progress: (): number => {
      const { input, output } = state$.playbackProgressInterpolation.peek()
      return transform(state$.scrollYProgress.get(), input, output)
    },
    layoutChangesIndex: (): number | null =>
      findClosestIndex(
        state$.layoutChanges.peek(),
        state$.progress.get(),
        (it) => it.at,
      ) ?? null,
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
