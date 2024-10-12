'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { FunctionReturnType } from 'convex/server'
import type { PropsWithChildren } from 'react'
import type { api } from '~/convex/_generated/api'
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
})

export type WorkspaceProjectPostContextValue = ReturnType<
  typeof mapToContextValue
>

export const [WorkspaceProjectPostContext, useWorkspaceProjectPostContext] =
  createStrictContext<Observable<WorkspaceProjectPostContextValue>>({
    name: 'WorkspaceProjectPostContext',
  })

export function WorkspaceProjectPostProvider({
  children,
  data,
}: PropsWithChildren & {
  data: PageData
}) {
  const value$ = useObservable<WorkspaceProjectPostContextValue>(
    mapToContextValue(data),
  )

  return (
    <WorkspaceProjectPostContext.Provider value={value$}>
      {children}
    </WorkspaceProjectPostContext.Provider>
  )
}
