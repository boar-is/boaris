'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import { applyOverride } from '~/features/layout/apply-override'
import { determineOverride } from '~/features/layout/determine-override'
import { useLayoutMode$ } from '~/features/layout/layout-mode-provider'
import { usePostPage } from '~/features/post/post-page-provider'
import { createStrictContext } from '~/lib/react/create-strict-context'

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

  const { width } = useWindowSize({
    debounceDelay: 250,
  })
  const windowWidth$ = useObservable(0)
  useEffect(() => windowWidth$.set(width), [windowWidth$, width])

  const layoutChanges$ = useObservable(() => {
    const primaryLayoutChanges = layouts.primary.changes.get()

    if (!primaryLayoutChanges) {
      return []
    }

    // reimport
    const override = determineOverride({
      currentLayoutMode: layoutMode$.get(),
      primaryLayoutModes: layouts.primary.modes.get(),
      overrides: layouts.overrides.get(),
      width: windowWidth$.get(),
      includeDisabled: includeDisabledOverrides,
    })

    return applyOverride({ changes: primaryLayoutChanges, override })
  })

  return (
    <LayoutChangesContext.Provider value={layoutChanges$}>
      {children}
    </LayoutChangesContext.Provider>
  )
}
