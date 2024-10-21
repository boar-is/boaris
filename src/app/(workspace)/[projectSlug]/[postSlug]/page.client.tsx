'use client'

import * as S from '@effect/schema/Schema'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { atom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { remappedCaptions } from '~/model/captions'
import { determinedLayoutMode } from '~/model/layoutMode'
import type { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import type { Tag } from '~/model/tag'
import type { User } from '~/model/user'

export function WorkspaceProjectPostPageClient({
  revisionEncoded,
}: {
  postEncoded: typeof Post.Encoded
  tagsEncoded: ReadonlyArray<typeof Tag.Encoded>
  authorsEncoded: ReadonlyArray<typeof User.Encoded>
  revisionEncoded: typeof Revision.Encoded
}) {
  const revision = useMemo(
    () => S.decodeSync(Revision)(revisionEncoded),
    [revisionEncoded],
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

  return (
    <CaptionsAtomContext.Provider value={captionsAtom}>
      <LayoutModeAtomContext.Provider value={layoutModeAtom}>
        {M.value(useAtomValue(layoutModeAtom)).pipe(
          M.when('scrolling', () => <PostScrolling />),
          M.orElseAbsurd,
        )}
      </LayoutModeAtomContext.Provider>
    </CaptionsAtomContext.Provider>
  )
}
