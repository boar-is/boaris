import Link from 'next/link'
import { socialUrls } from '~/lib/data'

export function Footer() {
  return (
    <div className="container">
      <ul className="flex justify-between py-3 font-medium text-gray-9 text-sm md:gap-4 md:text-base">
        <li>
          <Link href="/" prefetch={false} className="rounded-sm px-2">
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
