'use client'

import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { atom, useAtomValue } from 'jotai'
import { CaptionsAtomContext } from '~/features/captions-atom-context'
import { useLayoutModeAtom } from '~/features/layout-mode-atom-context'
import { useRevisionAtom } from '~/features/revision-atom-context'
import { useConstant } from '~/lib/react/use-constant'
import { remappedCaptions } from '~/model/captions'
import { PostScrolling } from './post-scrolling'

export function PostContent() {
  const revisionAtom = useRevisionAtom()

  const captionsAtom = useConstant(() =>
    atom((get) => {
      const { captions, layout } = get(revisionAtom)
      return captions.pipe(O.map((it) => remappedCaptions(it, layout.changes)))
    }),
  )

  const layoutMode = useAtomValue(useLayoutModeAtom())

  return (
    <CaptionsAtomContext.Provider value={captionsAtom}>
      {M.value(layoutMode).pipe(
        M.when('scrolling', () => <PostScrolling />),
        M.orElseAbsurd,
      )}
    </CaptionsAtomContext.Provider>
  )
}
