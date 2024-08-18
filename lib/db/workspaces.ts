import type { Doc } from '~/lib/db/_shared'
import type { StorageDoc } from '~/lib/db/storages'

export type WorkspaceDoc = Doc & {
  name: string
  slug: string
  logoId?: StorageDoc['_id'] | undefined
  socials?: Record<'GitHub' | 'LinkedIn' | 'X', string> | undefined
}

export class WorkspaceService {
  private static repository = [
    {
      _id: '1',
      name: 'Boar.is',
      slug: 'boaris',
      logoId: '2',
      socials: {
        GitHub: 'https://github.com/BorisZubchenko',
        LinkedIn: 'https://linkedin.com/in/boris-zubchenko/',
        X: 'https://x.com/BorisZubchenk',
      },
      _creationTime: Date.now(),
    },
  ] satisfies ReadonlyArray<WorkspaceDoc>

  static activeWorkspaceSlug = 'boaris'

  static findOneBySlug(slug: WorkspaceDoc['slug']) {
    return WorkspaceService.repository.find((it) => it.slug === slug)
  }
}
