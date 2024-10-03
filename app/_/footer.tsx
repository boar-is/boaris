import { Link } from '~/src/components/link'
import type { WorkspaceVm } from '~/src/lib/api/get-workspace'
import { cx } from '~/src/lib/cx'

export function Footer({ workspace }: { workspace: WorkspaceVm }) {
  return (
    <div className="container">
      <ul className="flex justify-between py-4 font-semibold text-gray-9 md:gap-4">
        <li>
          <Link href="/" className="rounded-sm px-2">
            {workspace.name}
          </Link>
        </li>
        {workspace.socials.map((social, index) => (
          <li key={social.name} className={cx({ 'ml-auto': index === 0 })}>
            <a
              href={social.src}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm px-2"
            >
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
