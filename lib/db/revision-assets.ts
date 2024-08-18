import type { Doc } from '~/lib/db/_shared'
import type { AssetDoc } from './assets'
import type { RevisionDoc } from './revisions'

export type RevisionAssetDoc = Doc & {
  revisionId: RevisionDoc['_id']
  assetId: AssetDoc['_id']
}

export class RevisionAssetRepository {
  static #data: ReadonlyArray<RevisionAssetDoc> = [
    {
      _id: '1',
      revisionId: '1',
      assetId: '1',
      _creationTime: Date.now(),
    },
  ]

  static findByRevisionId(revisionId: RevisionDoc['_id']) {
    return RevisionAssetRepository.#data.filter(
      (it) => it.revisionId === revisionId,
    )
  }
}
