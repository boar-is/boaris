'use client'

import type { Observable } from '@legendapp/state'
import type { PropsWithChildren } from 'react'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import { useLayoutMode$ } from '~/features/layout/layout-mode-provider'
import { usePostPage } from '~/features/post/post-page-provider'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useWindowWidthAtom } from '~/lib/react/use-window-width-atom'

export const [LayoutChangesContext, useLayoutChanges$] = createStrictContext<
  Observable<Array<LayoutChange>>
>({
  name: 'LayoutChangesContext',
})

export function LayoutChangesProvider({
  children,
  includeDisabledOverrides = false,
}: PropsWithChildren & {
  includeDisabledOverrides?: boolean | undefined
}) {
  const { layouts } = usePostPage()

  const layoutMode$ = useLayoutMode$()

  const width$ = useWindowWidthAtom()

  // determinedLayoutChanges
  // const layoutChanges$ = useObservable(() => {
  //   const primaryLayoutChanges = layouts.primary.changes.get()
  //
  //   if (!primaryLayoutChanges) {
  //     return []
  //   }
  //
  //   // reimport
  //   const override = determinedOverride({
  //     currentLayoutMode: layoutMode$.get(),
  //     primaryLayoutModes: layouts.primary.modes.get(),
  //     overrides: layouts.overrides.get(),
  //     width: windowWidth$.get(),
  //     includeDisabled: includeDisabledOverrides,
  //   })
  //
  //   return applyOverride({ changes: primaryLayoutChanges, override })
  // })

  return (
    <LayoutChangesContext.Provider value={layoutChanges$}>
      {children}
    </LayoutChangesContext.Provider>
  )
}
