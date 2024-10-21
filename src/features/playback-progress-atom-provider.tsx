'use client'

import { type PrimitiveAtom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'

export const [PlaybackProgressAtomContext, usePlaybackProgressAtom] =
  createStrictContext<PrimitiveAtom<number>>({
    name: 'PlaybackProgressAtomContext',
  })

export function PlaybackProgressAtomProvider({ children }: PropsWithChildren) {
  return (
    <PlaybackProgressAtomContext.Provider value={useConstant(() => atom(0))}>
      {children}
    </PlaybackProgressAtomContext.Provider>
  )
}
