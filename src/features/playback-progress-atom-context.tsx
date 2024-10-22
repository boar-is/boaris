'use client'

import type { PrimitiveAtom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'

export const [PlaybackProgressAtomContext, usePlaybackProgressAtom] =
  createStrictContext<PrimitiveAtom<number>>({
    name: 'PlaybackProgressAtomContext',
  })
