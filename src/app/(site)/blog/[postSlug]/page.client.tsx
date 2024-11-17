'use client'

import { Match, Schema } from 'effect'
import { atom, useAtomValue } from 'jotai'
import { AssetsAtomContext } from '~/features/assets-atom-context'
import { AuthorsAtomContext } from '~/features/authors-atom-context'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { LayoutAtomContext } from '~/features/layout-atom-context'
import { LayoutModeAtomContext } from '~/features/layout-mode-atom-context'
import { PostAtomContext } from '~/features/post-atom-context'
import { RevisionAtomContext } from '~/features/revision-atom-context'
import { TagsAtomContext } from '~/features/tags-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import type { LayoutMode } from '~/model/layoutMode'
import { PostRequest } from '~/rpc/post-request'
import { PostScrolling } from './_/post-scrolling'

export function WorkspaceProjectPostPageClient({
  result,
}: {
  result: (typeof PostRequest)['success']['Encoded']
}) {
  const { post, tags, authors, revision, captions, layout, assets } =
    Schema.decodeSync(PostRequest.success)(result)!

  const postAtom = useConstant(() => atom(post))
  const tagsAtom = useConstant(() => atom(tags))
  const authorsAtom = useConstant(() => atom(authors))
  const revisionAtom = useConstant(() => atom(revision))
  const captionsAtom = useConstant(() => atom(captions))
  const layoutAtom = useConstant(() => atom(layout))
  const assetsAtom = useConstant(() => atom(assets))

  const layoutModeAtom = useConstant(() =>
    atom<typeof LayoutMode.Type>('scrolling'),
  )

  return (
    <PostAtomContext.Provider value={postAtom}>
      <TagsAtomContext.Provider value={tagsAtom}>
        <AuthorsAtomContext.Provider value={authorsAtom}>
          <RevisionAtomContext.Provider value={revisionAtom}>
            <CaptionsAtomContext.Provider value={captionsAtom}>
              <LayoutAtomContext.Provider value={layoutAtom}>
                <AssetsAtomContext.Provider value={assetsAtom}>
                  <LayoutModeAtomContext.Provider value={layoutModeAtom}>
                    {Match.value(useAtomValue(layoutModeAtom)).pipe(
                      Match.when('scrolling', () => <PostScrolling />),
                      Match.orElseAbsurd,
                    )}
                  </LayoutModeAtomContext.Provider>
                </AssetsAtomContext.Provider>
              </LayoutAtomContext.Provider>
            </CaptionsAtomContext.Provider>
          </RevisionAtomContext.Provider>
        </AuthorsAtomContext.Provider>
      </TagsAtomContext.Provider>
    </PostAtomContext.Provider>
  )
}
