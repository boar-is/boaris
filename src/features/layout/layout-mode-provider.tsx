'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useMemo } from 'react'
import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type LayoutModeContextValue = {
  currentLayoutMode$: Observable<LayoutMode>
  primaryLayoutModes: Array<LayoutMode>
}

export const [LayoutModeContext, useLayoutMode] =
  createStrictContext<LayoutModeContextValue>({
    name: 'LayoutModeContext',
  })

export function LayoutModeProvider({
  children,
  primaryLayoutModes = [],
}: PropsWithChildren & {
  primaryLayoutModes?: Array<LayoutMode> | undefined
}) {
  const initialLayoutMode: LayoutMode =
    !primaryLayoutModes?.length || primaryLayoutModes.includes('static')
      ? 'static'
      : primaryLayoutModes.includes('scrolling')
        ? 'scrolling'
        : primaryLayoutModes.includes('sliding')
          ? 'sliding'
          : 'watching'

  const currentLayoutMode$ = useObservable(initialLayoutMode)

  const value = useMemo(
    (): LayoutModeContextValue => ({ currentLayoutMode$, primaryLayoutModes }),
    [currentLayoutMode$, primaryLayoutModes],
  )

  return (
    <LayoutModeContext.Provider value={value}>
      {children}
    </LayoutModeContext.Provider>
  )
}
