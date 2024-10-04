import type { PropsWithChildren } from 'react'
import { AriaRouterProvider } from './aria-router-provider'
import { FocusVisibleProvider } from './focus-visible-provider'
import { FramerMotionProvider } from './framer-motion-provider'
import { I18nProvider } from './i18n-provider'
import { LocalizedStringProvider } from './localized-string-provider'
import { ToastProvider } from './toast-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <FocusVisibleProvider />
      <LocalizedStringProvider locale="en-US" />
      <ToastProvider />
      <I18nProvider>
        <AriaRouterProvider>
          <FramerMotionProvider>{children}</FramerMotionProvider>
        </AriaRouterProvider>
      </I18nProvider>
    </>
  )
}
