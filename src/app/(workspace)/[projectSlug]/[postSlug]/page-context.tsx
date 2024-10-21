'use client'

import * as S from '@effect/schema/Schema'
import { atom } from 'jotai'
import type { PropsWithChildren } from 'react'
import { RevisionAtomContext } from '~/features/revision-atom-context'
import { useConstant } from '~/lib/react/use-constant'
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

  return (
    <RevisionAtomContext.Provider value={revisionAtom}>
      {children}
    </RevisionAtomContext.Provider>
  )
}
