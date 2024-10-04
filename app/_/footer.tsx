import { Link } from '~/src/components/link'
import { cx } from '~/src/lib/cx'
import type { RichSocialLink } from './rich-social-link'

export function Footer({
  brandName,
  socialLinks,
}: {
  brandName: string
  socialLinks: ReadonlyArray<RichSocialLink> | null
}) {
  return (
    <div className="container">
      <ul className="flex justify-between py-4 font-semibold text-gray-9 md:gap-4">
        <li>
          <Link href="/" className="rounded-sm px-2">
            {brandName}
          </Link>
        </li>
        {socialLinks?.map((socialLink, index) => (
          <li key={socialLink.href} className={cx({ 'ml-auto': index === 0 })}>
            <a
              href={socialLink.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm px-2"
            >
              {socialLink.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
