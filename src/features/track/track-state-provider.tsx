import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type TrackStateContextValue = {
  a: number
}

export const [TrackStateContext, useTrackState$] = createStrictContext<
  Observable<TrackStateContextValue>
>({
  name: 'TrackStateContext',
})

export function TrackStateProvider({ children }: PropsWithChildren) {
  const trackState$ = useObservable((): TrackStateContextValue => {
    return {
      a: 42,
    }
  })

  return (
    <TrackStateContext.Provider value={trackState$}>
      {children}
    </TrackStateContext.Provider>
  )
}
