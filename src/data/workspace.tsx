import { GitHubIcon } from '~/lib/media/icons/github'

export const workspace = {
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
} as const
