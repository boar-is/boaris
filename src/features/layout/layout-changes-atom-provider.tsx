'use client'

import * as S from '@effect/schema/Schema'
import { type Atom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'
import { Layout } from '~/model/layout'
import {
  type LayoutChange,
  determinedLayoutChanges,
} from '~/model/layoutChange'

export const [LayoutChangesAtomContext, useLayoutChangesAtom] =
  createStrictContext<Atom<ReadonlyArray<typeof LayoutChange.Type>>>({
    name: 'LayoutChangesAtomContext',
  })

export function LayoutChangesAtomProvider({
  children,
  layoutEncoded,
  includeDisabledOverrides = false,
}: PropsWithChildren & {
  layoutEncoded: typeof Layout.Encoded
  includeDisabledOverrides?: boolean | undefined
}) {
  const { changes, modes, overrides } = S.decodeSync(Layout)(layoutEncoded)

  const widthAtom = useWindowWidthAtom()

  return (
    <LayoutChangesAtomContext.Provider
      value={useConstant(() =>
        atom((get) =>
          determinedLayoutChanges({
            changes,
            mode: 'scrolling',
            modes: modes,
            overrides: overrides,
            width: get(widthAtom),
            includeDisabled: includeDisabledOverrides,
          }),
        ),
      )}
    >
      {children}
    </LayoutChangesAtomContext.Provider>
  )
}
