'use client'

import { type MotionValue, useMotionValue } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type PlaybackProgressContextValue = MotionValue<number>

export const [PlaybackProgressContext, usePlaybackProgress] =
  createStrictContext<PlaybackProgressContextValue>({
    name: 'PlaybackProgressContext',
  })

export function PlaybackProgressProvider({ children }: PropsWithChildren) {
  const playbackProgress = useMotionValue(0)

  return (
    <PlaybackProgressContext.Provider value={playbackProgress}>
      {children}
    </PlaybackProgressContext.Provider>
  )
}
