'use client'

import type * as HS from 'effect/HashSet'
import { type Atom, atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { determineLayoutMode } from '~/features/determine-layout-mode'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import type { LayoutMode } from '~/model/layoutMode'

export const [LayoutModeContext, useLayoutMode] = createStrictContext<
  Atom<typeof LayoutMode.Type>
>({
  name: 'LayoutModeContext',
})

export function LayoutModeProvider({
  children,
  modes,
}: PropsWithChildren & {
  modes: HS.HashSet<typeof LayoutMode.Type>
}) {
  return (
    <LayoutModeContext.Provider
      value={useConstant(() => atom(determineLayoutMode(modes)))}
    >
      {children}
    </LayoutModeContext.Provider>
  )
}
