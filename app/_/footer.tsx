import Link from 'next/link'
import { workspace } from '~/lib/data'

export function Footer() {
  return (
    <div className="container">
      <ul className="flex justify-between py-4 font-medium text-gray-9 md:gap-4">
        <li>
          <Link href="/" className="rounded-sm px-2">
            Boar.is
          </Link>
        </li>
        <li className="ml-auto">
          <a
            href={workspace.socialUrls.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm px-2"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={workspace.socialUrls.x}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm px-2"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href={workspace.socialUrls.github}
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
