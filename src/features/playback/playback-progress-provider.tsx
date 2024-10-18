'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type PlaybackProgressContextValue = Observable<number>

export const [PlaybackProgressContext, usePlaybackProgress$] =
  createStrictContext<PlaybackProgressContextValue>({
    name: 'PlaybackProgressContext',
  })

export function PlaybackProgressProvider({ children }: PropsWithChildren) {
  const playbackProgress$ = useObservable(0)

  return (
    <PlaybackProgressContext.Provider value={playbackProgress$}>
      {children}
    </PlaybackProgressContext.Provider>
  )
}
