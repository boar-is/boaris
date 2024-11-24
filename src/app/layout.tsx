import type { PropsWithChildren } from 'react'
import { I18nProvider } from '~/lib/i18n/i18n-provider'
import { LocalizedStringProvider } from '~/lib/i18n/localized-string-provider'
import { FocusVisibleProvider } from '~/lib/interactions/focus-visible-provider'
import { JotaiProvider } from '~/lib/jotai/jotai-provider'
import { sans } from '~/lib/media/fonts/sans'
import { MotionProvider } from '~/lib/motion/provider'
import { cx } from '~/lib/react/cx'
import { AriaRouterProvider } from '~/lib/routing/aria-router-provider'
import { ToastProvider } from '~/lib/toast/toast-provider'
import './globals.css'
import { constructMetadata } from '~/lib/metadata/construct-metadata'
import { BackgroundProvider } from '~/lib/overlays/background'

export { viewport } from '~/lib/metadata/viewport'

export const metadata = constructMetadata()

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cx(
        sans.variable,
        'relative dark antialiased font-sans text-fg bg-bg',
      )}
    >
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body>
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <AriaRouterProvider>
            <JotaiProvider>
              <MotionProvider>
                <BackgroundProvider>{children}</BackgroundProvider>
              </MotionProvider>
            </JotaiProvider>
          </AriaRouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
