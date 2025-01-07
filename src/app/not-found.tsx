import Link from 'next/link'
import { buttonStyles } from '~/lib/buttons/button-styles'

export default function NotFound() {
  return (
    <div className="min-h-dvh text-balance grid place-content-center justify-items-center ~gap-4/8">
      <p className="text-accent-11 ~text-7xl/9xl font-semibold font-mono">
        404
      </p>
      <h1 className="font-bold ~text-3xl/5xl leading-tight">Not Found</h1>
      <p className="text-center">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <footer className="flex flex-wrap gap-4 *:~px-4/8">
        <Link
          href="https://google.com"
          target="_blank"
          className={buttonStyles({ intent: 'secondary' })}
        >
          Contact me
        </Link>
        <Link href="/" className={buttonStyles({ intent: 'primary' })}>
          Go home
        </Link>
      </footer>
    </div>
  )
}
