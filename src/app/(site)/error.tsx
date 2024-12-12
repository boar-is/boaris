'use client'

import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { Button } from '~/lib/buttons/button'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { Link } from '~/lib/navigation/link'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <article className="mx-auto max-w-xl ~px-8/12 ~py-8/12 ~space-y-8/12 ~text-base/xl leading-relaxed">
      <header>
        <h1 className="~text-3xl/5xl font-semibold">Something went wrong :/</h1>
      </header>
      <p className="text-gray-11 font-medium text-pretty ~space-y-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        aperiam, blanditiis corporis dolores dolorum impedit in ipsum iste
        magnam officia, officiis omnis placeat, rem reprehenderit sed sunt
        veritatis? Ea, id. {error.digest && <code>({error.digest})</code>}
      </p>
      <footer className="space-x-4 *:~px-4/8">
        <Link
          href="https://google.com"
          target="_blank"
          className={buttonStyles({ intent: 'secondary' })}
        >
          Contact me
        </Link>
        <Button
          intent="primary"
          onPress={() => {
            startTransition(() => {
              router.refresh()
              reset()
            })
          }}
        >
          Try again
        </Button>
      </footer>
    </article>
  )
}
