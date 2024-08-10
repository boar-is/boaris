import './globals.css'
import type { PropsWithChildren } from 'react'
import { cs } from '~/lib/cs'
import { JetBrainsMono, Switzer } from '~/lib/fonts'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={cs(
        Switzer.variable,
        JetBrainsMono.variable,
        'dark h-0 min-h-dvh bg-gray-50 font-sans text-gray-900',
      )}
    >
      <body>{children}</body>
    </html>
  )
}
