'use client'

import { useFocusVisibleListener } from '@react-aria/interactions'
import { LazyMotion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { RouterProvider as _RouterProvider } from 'react-aria-components'

export function FocusVisibleProvider() {
  useFocusVisibleListener((isFocusVisible) => {
    document.body.classList.toggle('focus-visible', isFocusVisible)
  }, [])

  return null
}

const loadFeatures = () =>
  import('~/lib/framer-motion/features').then((m) => m.default)

export function FramerMotionProvider({ children }: PropsWithChildren) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  )
}

export { I18nProvider } from 'react-aria-components'

declare module 'react-aria-components' {
  // noinspection JSUnusedGlobalSymbols
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

export function RouterProvider({ children }: PropsWithChildren) {
  const router = useRouter()

  return <_RouterProvider navigate={router.push}>{children}</_RouterProvider>
}
