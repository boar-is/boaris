'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type PropsWithChildren, useMemo } from 'react'
import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type LayoutModeContextValue = {
  layoutMode$: Observable<LayoutMode>
}

export const [LayoutModeContext, useLayoutModeContext] =
  createStrictContext<LayoutModeContextValue>({
    name: 'LayoutModeContext',
  })

export function LayoutModeProvider({
  children,
  primaryModes,
}: PropsWithChildren & {
  primaryModes?: Array<LayoutMode> | undefined
}) {
  const initialLayoutMode: LayoutMode =
    !primaryModes?.length || primaryModes.includes('static')
      ? 'static'
      : primaryModes.includes('scrolling')
        ? 'scrolling'
        : primaryModes.includes('sliding')
          ? 'sliding'
          : 'watching'

  const layoutMode$ = useObservable(initialLayoutMode)

  const value = useMemo(
    (): LayoutModeContextValue => ({ layoutMode$ }),
    [layoutMode$],
  )

  return (
    <LayoutModeContext.Provider value={value}>
      {children}
    </LayoutModeContext.Provider>
  )
}
