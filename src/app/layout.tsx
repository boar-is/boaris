import '~/lib/style/globals.css'
import type { PropsWithChildren } from 'react'
import { FramerMotionProvider } from '~/lib/framer-motion/provider'
import { I18nProvider } from '~/lib/i18n/i18n-provider'
import { LocalizedStringProvider } from '~/lib/i18n/localized-string-provider'
import { FocusVisibleProvider } from '~/lib/interactions/focus-visible-provider'
import { AriaRouterProvider } from '~/lib/routing/aria-router-provider'
import { getSansFontVariable } from '~/lib/style/fonts/get-sans-font-variable'
import { ToastProvider } from '~/lib/toast/toast-provider'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={getSansFontVariable()}>
      <body className="dark flex flex-col gap-4 md:gap-10 items-stretch min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <AriaRouterProvider>
            <FramerMotionProvider>{children}</FramerMotionProvider>
          </AriaRouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
