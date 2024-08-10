import Link from 'next/link'
import { socialUrls } from '~/lib/data'

export function Footer() {
  return (
    <div className="container">
      <ul className="flex justify-between gap-4 py-3 font-medium text-gray-600 text-sm">
        <li>
          <Link href="/" prefetch={false} className="rounded-sm">
            boar.is
          </Link>
        </li>
        <li className="ml-auto">
          <a
            href={socialUrls.x}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={socialUrls.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={socialUrls.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm"
          >
            GitHub
          </a>
        </li>
        <li>
          <Link href="/privacy" prefetch={false} className="rounded-sm">
            Privacy
          </Link>
        </li>
      </ul>
    </div>
  )
}
