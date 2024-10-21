import type { PropsWithChildren } from 'react'
import { FramerMotionProvider } from '~/lib/framer-motion/provider'
import { I18nProvider } from '~/lib/i18n/i18n-provider'
import { LocalizedStringProvider } from '~/lib/i18n/localized-string-provider'
import { FocusVisibleProvider } from '~/lib/interactions/focus-visible-provider'
import { JotaiProvider } from '~/lib/jotai/jotai-provider'
import { getSansFontClassName } from '~/lib/media/fonts/get-sans-font-class-name'
import { AriaRouterProvider } from '~/lib/routing/aria-router-provider'
import { ToastProvider } from '~/lib/toast/toast-provider'
import { cx } from '~/lib/utils/cx'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cx(
        getSansFontClassName(),
        'relative dark antialiased bg-gray-1 font-sans text-gray-11',
      )}
    >
      <body>
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <AriaRouterProvider>
            <JotaiProvider>
              <FramerMotionProvider>{children}</FramerMotionProvider>
            </JotaiProvider>
          </AriaRouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
