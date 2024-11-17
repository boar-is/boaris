import { Schema } from 'effect'

export class Workspace extends Schema.Class<Workspace>('Workspace')({
  name: Schema.NonEmptyTrimmedString,
  description: Schema.NonEmptyTrimmedString,
  logoUrl: Schema.NonEmptyTrimmedString,
  socialLinks: Schema.Array(
    Schema.Struct({
      href: Schema.NonEmptyTrimmedString,
      label: Schema.NonEmptyTrimmedString,
    }),
  ),
}) {}

export const workspace = new Workspace({
  name: 'Boaris',
  // TODO fill up
  description: 'Boaris description',
  logoUrl: '/logo.png',
  socialLinks: [
    {
      href: 'https://github.com/boaris',
      label: 'GitHub',
    },
  ],
})
