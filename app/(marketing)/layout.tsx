import type { PropsWithChildren } from 'react'
import { Footer } from './_/footer'
import { Navbar } from './_/navbar'

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col items-center overflow-y-scroll">
      <header className="container sticky top-0 w-full py-2">
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  )
}
