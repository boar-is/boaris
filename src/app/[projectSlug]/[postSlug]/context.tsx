'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { FunctionReturnType } from 'convex/server'
import type { PropsWithChildren } from 'react'
import type { api } from '~/convex/_generated/api'
import type { LayoutMode } from '~/convex/fields/revisions'
import { createStrictContext } from '~/src/lib/react/create-strict-context'

type PageData = NonNullable<FunctionReturnType<typeof api.functions.post.page>>

const mapToContextValue = ({ post, captions, layouts, tracks }: PageData) => ({
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
  scrollYProgress: 0,
  windowWidth: 0,
  layoutMode: 'scrolling' as LayoutMode,
})

export type WorkspaceProjectPostState = ReturnType<typeof mapToContextValue>

export const [WorkspaceProjectPostContext, useWorkspaceProjectPostContext] =
  createStrictContext<Observable<WorkspaceProjectPostState>>({
    name: 'WorkspaceProjectPostContext',
  })

export function WorkspaceProjectPostProvider({
  children,
  data,
}: PropsWithChildren & {
  data: PageData
}) {
  const state$ = useObservable<WorkspaceProjectPostState>(
    mapToContextValue(data),
  )

  return (
    <WorkspaceProjectPostContext.Provider value={state$}>
      {children}
    </WorkspaceProjectPostContext.Provider>
  )
}
