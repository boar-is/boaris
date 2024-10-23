'use client'

import * as M from 'effect/Match'
import * as O from 'effect/Option'
import * as S from 'effect/Schema'
import { atom, useAtomValue } from 'jotai'
import { AuthorsAtomContext } from '~/features/authors-atom-context'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutChangesAtomContext } from '~/features/layout-changes-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { PostAtomContext } from '~/features/post-atom-context'
import { TagsAtomContext } from '~/features/tags-atom-context'
import { TracksAtomContext } from '~/features/tracks-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'
import { remappedCaptions } from '~/model/captions'
import { determinedLayoutChanges } from '~/model/layoutChange'
import { determinedLayoutMode } from '~/model/layoutMode'
import { PostRequest } from '~/rpc/post-request'
import { PostScrolling } from './_/post-scrolling'

export function WorkspaceProjectPostPageClient({
  result,
}: {
  result: (typeof PostRequest)['success']['Encoded']
}) {
  const { post, tags, authors, revision } = S.decodeSync(PostRequest.success)(
    result,
  )!

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
        O.andThen(remappedCaptions(get(layoutChangesAtom))),
      ),
    ),
  )

  const tracksAtom = useConstant(() => atom((get) => get(revisionAtom).tracks))

  return (
    <PostAtomContext.Provider value={postAtom}>
      <TagsAtomContext.Provider value={tagsAtom}>
        <AuthorsAtomContext.Provider value={authorsAtom}>
          <CaptionsAtomContext.Provider value={captionsAtom}>
            <LayoutModeAtomContext.Provider value={layoutModeAtom}>
              <LayoutChangesAtomContext.Provider value={layoutChangesAtom}>
                <TracksAtomContext.Provider value={tracksAtom}>
                  {M.value(useAtomValue(layoutModeAtom)).pipe(
                    M.when('scrolling', () => <PostScrolling />),
                    M.orElseAbsurd,
                  )}
                </TracksAtomContext.Provider>
              </LayoutChangesAtomContext.Provider>
            </LayoutModeAtomContext.Provider>
          </CaptionsAtomContext.Provider>
        </AuthorsAtomContext.Provider>
      </TagsAtomContext.Provider>
    </PostAtomContext.Provider>
  )
}
