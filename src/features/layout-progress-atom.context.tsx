'use client'

import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'

export const [LayoutProgressAtomContext, useLayoutProgressAtom] =
  createStrictContext<Atom<number>>({
    name: 'LayoutProgressAtomContext',
  })
