'use client'

import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import type { LayoutMode } from '~/convex/values/revisions/layouts/layoutMode'
import { createStrictContext } from '~/lib/react/create-strict-context'

export const [LayoutModeContext, useLayoutMode$] = createStrictContext<
  Observable<LayoutMode>
>({
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

  const layoutMode$ = useObservable(initialLayoutMode)

  return (
    <LayoutModeContext.Provider value={layoutMode$}>
      {children}
    </LayoutModeContext.Provider>
  )
}
