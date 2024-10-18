'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import type { LayoutChange } from '~/convex/values/revisions/layouts/layoutChange'
import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import type { LayoutOverride } from '~/convex/values/revisions/layouts/layoutOverride'
import { applyOverride } from '~/features/layout/apply-override'
import { determineOverride } from '~/features/layout/determine-override'
import { useLayoutMode$ } from '~/features/layout/layout-mode-provider'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type LayoutChangesContextValue = Observable<Array<LayoutChange>>

export const [LayoutChangesContext, useLayoutChanges$] =
  createStrictContext<LayoutChangesContextValue>({
    name: 'LayoutChangesContext',
  })

export function LayoutChangesProvider({
  children,
  primaryLayoutChanges,
  primaryLayoutModes,
  overrides,
  includeDisabledOverrides = false,
}: PropsWithChildren & {
  primaryLayoutChanges?: Array<LayoutChange> | undefined
  primaryLayoutModes?: Array<LayoutMode> | undefined
  overrides?: Array<LayoutOverride> | undefined
  includeDisabledOverrides?: boolean | undefined
}) {
  const layoutMode$ = useLayoutMode$()

  const { width } = useWindowSize({
    debounceDelay: 250,
  })
  const windowWidth$ = useObservable(0)
  useEffect(() => windowWidth$.set(width), [windowWidth$, width])

  const layoutChanges$ = useObservable(() => {
    if (!primaryLayoutChanges) {
      return []
    }

    const override = determineOverride({
      currentLayoutMode: layoutMode$.get(),
      primaryLayoutModes,
      overrides,
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
