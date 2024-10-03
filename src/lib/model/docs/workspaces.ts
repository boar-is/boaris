import type { Doc } from '~/lib/model/docs/_shared'
import type { StorageDoc } from '~/lib/model/docs/storages'

export type WorkspaceDoc = Doc & {
  name: string
  slug: string
  logoId?: StorageDoc['_id'] | undefined
  socials?: Partial<Record<'LinkedIn' | 'X' | 'GitHub', string>> | undefined
}

export const workspaceDocs: ReadonlyArray<WorkspaceDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    name: 'Boar.is',
    slug: 'boaris',
    logoId: '2',
    socials: {
      LinkedIn: 'https://linkedin.com/in/boris-zubchenko/',
      X: 'https://x.com/BorisZubchenk',
      GitHub: 'https://github.com/BorisZubchenko',
    },
  },
]
