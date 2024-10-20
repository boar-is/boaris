import type { Observable, OpaqueObject } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { EditorState } from '@uiw/react-codemirror'
import type { PropsWithChildren } from 'react'
import { useActions$ } from '~/features/chunk/actions-provider'
import type { PostPageContextValue } from '~/features/post/post-page-provider'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type TrackState = {
  type: 'text'
  editorState?: OpaqueObject<EditorState> | undefined
}

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
  return useObservable(() => trackStates$.states[trackId$.get()])
}

export function TrackStatesProvider({
  children,
  tracks$,
}: PropsWithChildren & { tracks$: PostPageContextValue['tracks'] }) {
  const actions$ = useActions$()

  const trackStates$ = useObservable<TrackStatesContextValue>({ states: {} })

  return (
    <TrackStatesContext.Provider value={trackStates$}>
      {children}
    </TrackStatesContext.Provider>
  )
}
