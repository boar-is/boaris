import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type TrackState = { a: number }

export type TrackStatesContextValue = {
  states: Record<string, TrackState>
}

const [TrackStatesContext, useTrackStates$] = createStrictContext<
  Observable<TrackStatesContextValue>
>({
  name: 'TrackStatesContext',
})

export const useTrackState$ = (trackId$: Observable<string>) => {
  const trackStates$ = useTrackStates$()
  return useObservable((): TrackState | undefined => {
    return trackStates$.states.get(true)[trackId$.get()]
  })
}

export function TrackStatesProvider({ children }: PropsWithChildren) {
  const trackStates$ = useObservable((): TrackStatesContextValue => {
    return {
      states: {},
    }
  })

  return (
    <TrackStatesContext.Provider value={trackStates$}>
      {children}
    </TrackStatesContext.Provider>
  )
}
