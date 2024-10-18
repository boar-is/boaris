'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useMemo } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type PlaybackProgressContextValue = {
  playbackProgress$: Observable<number>
}

export const [PlaybackProgressContext, usePlaybackProgressContext] =
  createStrictContext<PlaybackProgressContextValue>({
    name: 'PlaybackProgressContext',
  })

export function PlaybackProgressProvider({ children }: PropsWithChildren) {
  const playbackProgress$ = useObservable(0)

  const value = useMemo(
    (): PlaybackProgressContextValue => ({ playbackProgress$ }),
    [playbackProgress$],
  )

  return (
    <PlaybackProgressContext.Provider value={value}>
      {children}
    </PlaybackProgressContext.Provider>
  )
}
