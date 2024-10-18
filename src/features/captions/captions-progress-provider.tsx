'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useMemo } from 'react'
import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { usePlaybackProgressContext } from '~/features/playback/playback-progress-provider'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type CaptionsProgressContextValue = {
  captionsProgress$: Observable<number>
}

export const [CaptionsProgressContext, useCaptionsProgressContext] =
  createStrictContext<CaptionsProgressContextValue>({
    name: 'CaptionsProgressContext',
  })

export function CaptionsProgressProvider({
  children,
}: PropsWithChildren & { interpolation: Interpolation }) {
  const { playbackProgress$ } = usePlaybackProgressContext()
  // TODO Implement interpolation
  const captionsProgress$ = useObservable(playbackProgress$)

  const value = useMemo(
    (): CaptionsProgressContextValue => ({ captionsProgress$ }),
    [captionsProgress$],
  )

  return (
    <CaptionsProgressContext.Provider value={value}>
      {children}
    </CaptionsProgressContext.Provider>
  )
}
