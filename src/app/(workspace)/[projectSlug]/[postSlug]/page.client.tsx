'use client'

import * as S from '@effect/schema/Schema'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { atom, useAtomValue } from 'jotai'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'
import { remappedCaptions } from '~/model/captions'
import { determinedLayoutChanges } from '~/model/layoutChange'
import { determinedLayoutMode } from '~/model/layoutMode'
import type { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import type { Tag } from '~/model/tag'
import type { User } from '~/model/user'
import { PostScrolling } from './_/post-scrolling'

export function WorkspaceProjectPostPageClient({
  revisionEncoded,
}: {
  postEncoded: typeof Post.Encoded
  tagsEncoded: ReadonlyArray<typeof Tag.Encoded>
  authorsEncoded: ReadonlyArray<typeof User.Encoded>
  revisionEncoded: typeof Revision.Encoded
}) {
  const revisionAtom = useConstant(() =>
    atom(S.decodeSync(Revision)(revisionEncoded)),
  )

  const layoutModeAtom = useConstant(() =>
    atom((get) => determinedLayoutMode(get(revisionAtom).layout.modes)),
  )

  const windowWidthAtom = useWindowWidthAtom()

  const layoutChangesAtom = useConstant(() =>
    atom((get) => {
      const mode = get(layoutModeAtom)
      const width = get(windowWidthAtom)
      const {
        layout: { changes, modes, overrides },
      } = get(revisionAtom)

      return determinedLayoutChanges({
        changes,
        mode,
        modes,
        overrides,
        width,
      })
    }),
  )

  const captionsAtom = useConstant(() =>
    atom((get) => {
      return get(revisionAtom).captions.pipe(
        O.map((captions) => remappedCaptions(captions, get(layoutChangesAtom))),
      )
    }),
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
