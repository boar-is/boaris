import type * as HS from 'effect/HashSet'
import { type Atom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import { type LayoutMode, determineLayoutMode } from '~/model/layoutMode'

export const [LayoutModeAtomContext, useLayoutModeAtom] = createStrictContext<
  Atom<typeof LayoutMode.Type>
>({
  name: 'LayoutModeAtomContext',
})

export function LayoutModeAtomProvider({
  children,
  modes,
}: PropsWithChildren & {
  modes: HS.HashSet<typeof LayoutMode.Type>
}) {
  return (
    <LayoutModeAtomContext.Provider
      value={useConstant(() => atom(determineLayoutMode(modes)))}
    >
      {children}
    </LayoutModeAtomContext.Provider>
  )
}
