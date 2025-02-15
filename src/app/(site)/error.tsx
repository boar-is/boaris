'use client'

import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { Button } from '~/lib/buttons/button'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { Link } from '~/lib/navigation/link'

const whitespace = ' '

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <article className="mx-auto max-w-xl ~px-8/12 ~py-8/12 ~space-y-8/12 ~text-base/xl leading-relaxed text-pretty font-medium">
      <header>
        <h1 className="~text-3xl/5xl font-semibold">
          Oops! Something went wrong :/
        </h1>
      </header>
      <p>
        I’m experimenting with a new format, and, well, sometimes things break.
        Don’t worry, though—I’ll get this fixed as soon as possible.{whitespace}
        {error.digest && (
          <code className="text-gray-11">(digest {error.digest})</code>
        )}
      </p>
      <footer className="flex flex-wrap gap-4 *:~px-4/8">
        <Link
          href={process.env['CONTACT_ME_FORM_URL']!}
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
      <p>Thanks for your patience as I refine this experience!</p>
    </article>
  )
}
