'use client'

import * as S from '@effect/schema/Schema'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { atom, useAtomValue } from 'jotai'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { remappedCaptions } from '~/model/captions'
import { determinedLayoutMode } from '~/model/layoutMode'
import { Revision } from '~/model/revision'
import { PostScrolling } from './post-scrolling'

export function PostContent({
  revisionEncoded,
}: {
  revisionEncoded: typeof Revision.Encoded
}) {
  const revisionAtom = useConstant(() =>
    atom(S.decodeSync(Revision)(revisionEncoded)),
  )

  const captionsAtom = useConstant(() =>
    atom((get) => {
      const { captions, layout } = get(revisionAtom)
      return captions.pipe(O.map((it) => remappedCaptions(it, layout.changes)))
    }),
  )

  const layoutModeAtom = useConstant(() =>
    atom((get) => determinedLayoutMode(get(revisionAtom).layout.modes)),
  )

  const layoutMode = useAtomValue(layoutModeAtom)

  return (
    <CaptionsAtomContext.Provider value={captionsAtom}>
      <LayoutModeAtomContext.Provider value={layoutModeAtom}>
        {M.value(layoutMode).pipe(
          M.when('scrolling', () => <PostScrolling />),
          M.orElseAbsurd,
        )}
      </LayoutModeAtomContext.Provider>
    </CaptionsAtomContext.Provider>
  )
}
