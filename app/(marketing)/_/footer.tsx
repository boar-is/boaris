import Link from 'next/link'
import { socialUrls } from '~/lib/data'

export function Footer() {
  return (
    <div className="container">
      <ul className="flex justify-between py-4 font-medium text-gray-9 md:gap-4">
        <li>
          <Link href="/" className="rounded-sm px-2">
            boar.is
          </Link>
        </li>
        <li className="ml-auto">
          <a
            href={socialUrls.x}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm px-2"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={socialUrls.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm px-2"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={socialUrls.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm px-2"
          >
            GitHub
          </a>
        </li>
      </ul>
    </div>
  )
}
