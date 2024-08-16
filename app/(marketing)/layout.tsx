import type { PropsWithChildren } from 'react'
import { Footer } from './_/footer'
import { Navbar } from './_/navbar'

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <header className="container sticky z-10 top-0 w-full py-3">
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container">
        <Footer />
      </footer>
    </div>
  )
}
