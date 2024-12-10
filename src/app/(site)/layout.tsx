import { Array, pipe } from 'effect'
import type { PropsWithChildren } from 'react'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { SignatureIcon } from '~/lib/media/icons'
import logo from '~/lib/media/icons/logo.png'
import { Image } from '~/lib/media/image'
import { matchSocialNetworkIcon } from '~/lib/media/match-social-network-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { Link } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { workspace } from '~/model/workspace'
import { CtaModal } from './_cta-modal'

const itemCx = cx('flex justify-center items-center rounded-full h-full')

export default async function SiteLayout({ children }: PropsWithChildren) {
  const { name } = workspace

  const socialLinks = pipe(
    workspace.socialLinks,
    Array.map((link) => ({
      ...link,
      Icon: matchSocialNetworkIcon(link.href),
    })),
  )

  return (
    <div className="flex flex-col ~gap-4/10 items-stretch min-h-dvh">
      <header className="container sticky z-10 top-0 py-3">
        <nav
          className={cx(
            shadowInsetStyles,
            'bg-clip-padding border border-white/10 rounded-full after:rounded-full p-2.5 drop-shadow-lg',
            'bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-blur-md backdrop-saturate-150',
          )}
        >
          <ul className="flex items-stretch justify-between ~gap-2/4">
            <li>
              <Link
                href="/"
                className={cx(
                  itemCx,
                  '~gap-1.5/2.5 select-none ~text-lg/xl leading-tight break-all font-semibold',
                )}
              >
                <Image
                  src={logo}
                  alt={`${name}'s logo`}
                  width={36}
                  height={36}
                  className="rounded-[inherit] shadow-inner ~size-8/10"
                />
                {name}
              </Link>
            </li>
            {socialLinks.map((socialLink, index) => (
              <li
                key={socialLink.href}
                className={cx({ 'ml-auto': index === 0 })}
              >
                <Link
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(
                    buttonStyles({ intent: 'tertiary' }),
                    itemCx,
                    '~px-2/3 ~-mx-1/2  text-gray-10',
                  )}
                >
                  <span className="sr-only">{socialLink.label} Profile</span>
                  <socialLink.Icon className="~size-4/6" />
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <CtaModal />
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container pb-24 pt-12 flex justify-center items-center">
        <BlurFade inView>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-center"
          >
            <SignatureIcon className="mx-4 inline-block h-16 opacity-95 drop-shadow" />
          </Link>
        </BlurFade>
      </footer>
    </div>
  )
}
