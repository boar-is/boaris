import { Workspace } from '~/model/workspace'

export const workspace = new Workspace({
  name: 'Boaris',
  // TODO fill up
  description: 'Boaris description',
  logoUrl: '/logo.png',
  socialLinks: [
    {
      href: 'https://github.com/boar-is',
      label: 'GitHub',
    },
    {
      href: process.env['CONTACT_ME_FORM_URL']!,
      label: 'Contact Me',
    },
  ],
})
