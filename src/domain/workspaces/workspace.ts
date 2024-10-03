import type { Entity } from '~/src/shared/entity'

export type Workspace = Entity & {
  readonly name: string
  readonly slug: string
  readonly logoId: Entity['_id'] | null
  readonly socialLinks: ReadonlyArray<string> | null
}

export const workspaceRepository: ReadonlyArray<Workspace> = [
  {
    _id: 'f1yR23PbuoDW',
    _creationTime: Date.now(),
    name: 'Boar.is',
    slug: 'boaris',
    logoId: 'F6gGQOuGSZGr',
    socialLinks: [
      'https://linkedin.com/in/boris-zubchenko/',
      'https://x.com/BorisZubchenk',
      'https://github.com/BorisZubchenko',
    ],
  },
]
