import './globals.css'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { getRichSocialLinks } from '~/app/_/get-rich-social-links'
import {
  FocusVisibleProvider,
  FramerMotionProvider,
  I18nProvider,
  RouterProvider,
} from '~/src/components/providers/client.providers'
import {
  LocalizedStringProvider,
  ToastProvider,
} from '~/src/components/providers/server.providers'
import { Switzer } from '~/src/lib/fonts'
import { queryWorkspace } from '~/src/rpc/query-workspace'
import { Footer } from './_/footer'
import { Navbar } from './_/navbar'

export default async function RootLayout({ children }: PropsWithChildren) {
  const workspace = await queryWorkspace('boaris')

  if (!workspace) {
    notFound()
  }

  const socialLinks = getRichSocialLinks(workspace.socialLinks)

  return (
    <html lang="en" className={Switzer.variable}>
      <body className="dark flex flex-col gap-4 md:gap-10 items-stretch h-0 min-h-dvh bg-gray-1 font-sans text-gray-11 antialiased">
        <FocusVisibleProvider />
        <LocalizedStringProvider locale="en-US" />
        <ToastProvider />
        <I18nProvider>
          <RouterProvider>
            <FramerMotionProvider>
              <header className="container sticky z-10 top-0 py-3">
                <Navbar
                  brandLogoSrc={workspace.logoSrc}
                  brandName={workspace.name}
                  socialLinks={socialLinks}
                />
              </header>
              <div className="z-[-2] absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
              <main className="flex-1">{children}</main>
              <footer className="container">
                <Footer brandName={workspace.name} socialLinks={socialLinks} />
              </footer>
            </FramerMotionProvider>
          </RouterProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
