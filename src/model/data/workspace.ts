import { Workspace } from '~/model/workspace'

export const workspace = new Workspace({
  name: 'Boaris',
  description:
    'I’m sharing my personal approach to learning — an interactive format with step-by-step coding guides and clear, practical explanations.',
  logoUrl: '/logo.webp',
  socialLinks: [
    {
      href: 'https://github.com/boar-is',
      label: 'GitHub',
    },
    {
      href: 'https://x.com/MrBoaris',
      label: 'X',
    },
  ],
})
