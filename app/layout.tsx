import './globals.css'
import type { PropsWithChildren } from 'react'
import {
  FocusVisibleProvider,
  FramerMotionProvider,
  I18nProvider,
  RouterProvider,
} from '~/components/providers/client.providers'
import {
  LocalizedStringProvider,
  ToastProvider,
} from '~/components/providers/server.providers'
import { cs } from '~/lib/cs'
import { JetBrainsMono, Switzer } from '~/lib/fonts'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cs(Switzer.variable, JetBrainsMono.variable)}>
      <body className="dark h-0 min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <RouterProvider>
            <FramerMotionProvider>{children}</FramerMotionProvider>
          </RouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
