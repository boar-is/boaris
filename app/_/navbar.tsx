import Image from 'next/image'
import Link from 'next/link'
import { ToggleButton } from '~/components/button'
import {
  CloseIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  XIcon,
} from '~/components/icons'
import { workspace } from '~/lib/data'
import { NavbarMenuButtonProvider, NavbarMobileMenuRoot } from './navbar.client'

export function NavbarMenu() {
  return (
    <ul>
      <li>
        <Link href="/">
          <Image
            src={workspace.logoSrc}
            alt={`${workspace.name}'s logo`}
            width={48}
            height={48}
          />
          {workspace.name}
        </Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link
          href={workspace.socialUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">LinkedIn Profile</span>
          <LinkedInIcon className="size-8" />
        </Link>
      </li>
      <li>
        <Link
          href={workspace.socialUrls.x}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">X Profile</span>
          <XIcon className="size-8" />
        </Link>
      </li>
      <li>
        <Link
          href={workspace.socialUrls.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">GitHub Profile</span>
          <GitHubIcon className="size-8" />
        </Link>
      </li>
      <li>
        <NavbarMenuButtonProvider>
          <ToggleButton
            type="button"
            className="group relative flex items-center"
          >
            <span className="sr-only">Toggle Menu</span>
            <MenuIcon className="size-5 rotate-0 scale-100 transition-transform group-selected:rotate-90 group-selected:scale-0" />
            <CloseIcon className="-rotate-90 absolute size-5 scale-0 transition-transform group-selected:rotate-0 group-selected:scale-100" />
          </ToggleButton>
        </NavbarMenuButtonProvider>
      </li>
    </ul>
  )
}

export function NavbarMobileMenu() {
  return (
    <NavbarMobileMenuRoot>
      <ul>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link
            href={workspace.socialUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn Profile</span>
            <LinkedInIcon className="size-8" />
          </Link>
        </li>
        <li>
          <Link
            href={workspace.socialUrls.x}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">X Profile</span>
            <XIcon className="size-8" />
          </Link>
        </li>
        <li>
          <Link
            href={workspace.socialUrls.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub Profile</span>
            <GitHubIcon className="size-8" />
          </Link>
        </li>
      </ul>
    </NavbarMobileMenuRoot>
  )
}
