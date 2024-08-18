import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export type WorkspaceDoc = Doc & {
  name: string
  slug: string
  logoId?: StorageDoc['_id'] | undefined
  socials?: Partial<Record<'LinkedIn' | 'X' | 'GitHub', string>> | undefined
}

export class WorkspaceRepository {
  static #data: ReadonlyArray<WorkspaceDoc> = [
    {
      _id: '1',
      name: 'Boar.is',
      slug: 'boaris',
      logoId: '2',
      socials: {
        LinkedIn: 'https://linkedin.com/in/boris-zubchenko/',
        X: 'https://x.com/BorisZubchenk',
        GitHub: 'https://github.com/BorisZubchenko',
      },
      _creationTime: Date.now(),
    },
  ]

  static findOneBySlug(slug: WorkspaceDoc['slug']) {
    return WorkspaceRepository.#data.find((it) => it.slug === slug)
  }
}
