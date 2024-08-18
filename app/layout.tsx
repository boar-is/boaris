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
import { Switzer } from '~/lib/fonts'
import { Footer } from './_/footer'
import { Navbar } from './_/navbar'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={Switzer.variable}>
      <body className="dark h-0 min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <RouterProvider>
            <FramerMotionProvider>
              <div className="flex h-full flex-col gap-4 md:gap-10 items-stretch overflow-y-scroll">
                <header className="container sticky z-10 top-0 py-3">
                  <Navbar />
                </header>
                <main className="flex-1">{children}</main>
                <footer className="container">
                  <Footer />
                </footer>
              </div>
            </FramerMotionProvider>
          </RouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
