'use client'

import * as S from '@effect/schema/Schema'
import { atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { RevisionAtomContext } from '~/features/revision-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { determinedLayoutMode } from '~/model/layoutMode'
import { Revision } from '~/model/revision'

export function WorkspaceProjectPostPageProvider({
  revisionEncoded,
  children,
}: PropsWithChildren & {
  revisionEncoded: typeof Revision.Encoded
}) {
  const revisionAtom = useConstant(() =>
    atom(S.decodeSync(Revision)(revisionEncoded)),
  )

  const layoutMode = useConstant(() =>
    atom((get) => determinedLayoutMode(get(revisionAtom).layout.modes)),
  )

  return (
    <RevisionAtomContext.Provider value={revisionAtom}>
      <LayoutModeAtomContext.Provider value={layoutMode}>
        {children}
      </LayoutModeAtomContext.Provider>
    </RevisionAtomContext.Provider>
  )
}
