import { type Atom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'
import type { Layout } from '~/model/layout'
import {
  type LayoutChange,
  determinedLayoutChanges,
} from '~/model/layoutChange'
import { useLayoutModeAtom } from './layout-mode-atom-provider'

export const [LayoutChangesAtomContext, useLayoutChangesAtom] =
  createStrictContext<Atom<ReadonlyArray<typeof LayoutChange.Type>>>({
    name: 'LayoutChangesAtomContext',
  })

export function LayoutChangesAtomProvider({
  children,
  layout: { changes, modes, overrides },
  includeDisabledOverrides = false,
}: PropsWithChildren & {
  layout: typeof Layout.Type
  includeDisabledOverrides?: boolean | undefined
}) {
  const modeAtom = useLayoutModeAtom()

  const widthAtom = useWindowWidthAtom()

  return (
    <LayoutChangesAtomContext.Provider
      value={useConstant(() =>
        atom((get) =>
          determinedLayoutChanges({
            changes,
            mode: get(modeAtom),
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
