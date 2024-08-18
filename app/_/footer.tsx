import { Link } from '~/components/link'
import { cx } from '~/lib/cx'
import type { WorkspaceDoc } from '~/lib/db/workspaces'

export function Footer({ workspace }: { workspace: WorkspaceDoc }) {
  return (
    <div className="container">
      <ul className="flex justify-between py-4 font-semibold text-gray-9 md:gap-4">
        <li>
          <Link href="/" className="rounded-sm px-2">
            {workspace.name}
          </Link>
        </li>
        {workspace.socials &&
          Object.entries(workspace.socials).map(
            ([socialName, socialSrc], index) => (
              <li key={socialName} className={cx({ 'ml-auto': index === 0 })}>
                <a
                  href={socialSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm px-2"
                >
                  {socialName}
                </a>
              </li>
            ),
          )}
      </ul>
    </div>
  )
}
