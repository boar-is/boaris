'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import type { Action } from '~/convex/values/chunks/action'
import type { Chunk } from '~/convex/values/chunks/chunk'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type ActionsContextValue = {
  actions: Record<string, Array<Action>>
}

export const [ActionsContext, useActions$] = createStrictContext<
  Observable<ActionsContextValue>
>({
  name: 'ActionsContext',
})

export function ActionsProvider({
  children,
  chunks$,
}: PropsWithChildren & {
  chunks$: Observable<Array<Pick<Chunk, 'offset' | 'actions'>>>
}) {
  const actions$ = useObservable((): ActionsContextValue => {
    const unsortedActions = chunks$
      .get(true)
      .reduce((actions: ActionsContextValue['actions'], chunk) => {
        for (const [trackId, trackActions] of Object.entries(chunk.actions)) {
          const offsetTrackActions = trackActions.map((it) => ({
            ...it,
            offset: it.offset + chunk.offset,
          }))
          actions[trackId] =
            actions[trackId]?.concat(offsetTrackActions) ?? offsetTrackActions
        }

        return actions
      }, {})

    const actions = Object.fromEntries(
      Object.entries(unsortedActions).map(
        ([key, value]) =>
          [key, value.toSorted((a, b) => a.offset - b.offset)] as const,
      ),
    )

    return {
      actions,
    }
  })

  return (
    <ActionsContext.Provider value={actions$}>
      {children}
    </ActionsContext.Provider>
  )
}
