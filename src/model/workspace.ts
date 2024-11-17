import type { FC } from 'react'
import type { SvgIconProps } from '~/lib/media/icons/_base'
import { GitHubIcon } from '~/lib/media/icons/github'

export type Workspace = {
  name: string
  description: string
  logoUrl: string
  socialLinks: Array<{
    href: string
    label: string
    Icon: FC<SvgIconProps>
  }>
}

export const workspace: Workspace = {
  name: 'Boaris',
  // TODO fill up
  description: 'Boaris description',
  logoUrl: '/logo.png',
  socialLinks: [
    {
      href: 'https://github.com/boaris',
      label: 'GitHub',
      Icon: GitHubIcon,
    },
  ],
}
