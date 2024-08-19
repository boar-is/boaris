import './globals.css'
import { notFound } from 'next/navigation'
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
import { getWorkspace } from '~/lib/api/get-workspace'
import { Switzer } from '~/lib/fonts'
import { Footer } from './_/footer'
import { Navbar } from './_/navbar'

export default async function RootLayout({ children }: PropsWithChildren) {
  const workspace = await getWorkspace()

  if (!workspace) {
    notFound()
  }

  return (
    <html lang="en" className={Switzer.variable}>
      <body className="dark h-0 min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <RouterProvider>
            <FramerMotionProvider>
              <div className="flex min-h-full flex-col gap-4 md:gap-10 items-stretch">
                <header className="container sticky z-10 top-0 py-3">
                  <Navbar workspace={workspace} />
                </header>
                <main className="flex-1">{children}</main>
                <footer className="container">
                  <Footer workspace={workspace} />
                </footer>
              </div>
            </FramerMotionProvider>
          </RouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
