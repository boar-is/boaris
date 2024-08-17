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
import { cx } from '~/lib/cx'
import { JetBrainsMono, Switzer } from '~/lib/fonts'
import { NavbarMenu, NavbarMobileMenu } from './_/navbar'
import { Navbar } from './_/navbar.client'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={cx(Switzer.variable, JetBrainsMono.variable)}>
      <body className="dark h-0 min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <RouterProvider>
            <FramerMotionProvider>
              <div className="flex h-full flex-col overflow-y-scroll">
                <header className="sticky z-10 top-0 w-full">
                  <Navbar>
                    <NavbarMenu />
                    <NavbarMobileMenu />
                  </Navbar>
                </header>
                <main className="flex-1">{children}</main>
                <footer className="container">footer</footer>
              </div>
            </FramerMotionProvider>
          </RouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
