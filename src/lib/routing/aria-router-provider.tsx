'use client'

import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { RouterProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  // noinspection JSUnusedGlobalSymbols
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function AriaRouterProvider({ children }: PropsWithChildren) {
  const router = useRouter()

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>
}
