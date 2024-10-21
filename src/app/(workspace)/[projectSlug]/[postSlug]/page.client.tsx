'use client'

import * as S from '@effect/schema/Schema'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { atom, useAtomValue } from 'jotai'
import { PostPageQueryResult } from '~/convex/queries/postPage'
import { AuthorsAtomContext } from '~/features/authors-atom-context'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { PostAtomContext } from '~/features/post-atom-context'
import { TagsAtomContext } from '~/features/tags-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'
import { remappedCaptions } from '~/model/captions'
import { determinedLayoutChanges } from '~/model/layoutChange'
import { determinedLayoutMode } from '~/model/layoutMode'
import { PostScrolling } from './_/post-scrolling'

export function WorkspaceProjectPostPageClient({
  postPageQueryResult,
}: {
  postPageQueryResult: typeof PostPageQueryResult.Encoded
}) {
  const { post, tags, authors, revision } =
    S.decodeSync(PostPageQueryResult)(postPageQueryResult)

  const postAtom = useConstant(() => atom(post))
  const tagsAtom = useConstant(() => atom(tags))
  const authorsAtom = useConstant(() => atom(authors))
  const revisionAtom = useConstant(() => atom(revision))

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
    atom((get) =>
      get(revisionAtom).captions.pipe(
        O.andThen((captions) =>
          remappedCaptions(captions, get(layoutChangesAtom)),
        ),
      ),
    ),
  )

  return (
    <PostAtomContext.Provider value={postAtom}>
      <TagsAtomContext.Provider value={tagsAtom}>
        <AuthorsAtomContext.Provider value={authorsAtom}>
          <CaptionsAtomContext.Provider value={captionsAtom}>
            <LayoutModeAtomContext.Provider value={layoutModeAtom}>
              {M.value(useAtomValue(layoutModeAtom)).pipe(
                M.when('scrolling', () => <PostScrolling />),
                M.orElseAbsurd,
              )}
            </LayoutModeAtomContext.Provider>
          </CaptionsAtomContext.Provider>
        </AuthorsAtomContext.Provider>
      </TagsAtomContext.Provider>
    </PostAtomContext.Provider>
  )
}
