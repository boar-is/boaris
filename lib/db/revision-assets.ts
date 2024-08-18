import type { Doc } from '~/lib/db/_shared'
import type { AssetDoc } from './assets'
import type { RevisionDoc } from './revisions'

export type RevisionAssetDoc = Doc & {
  revisionId: RevisionDoc['_id']
  assetId: AssetDoc['_id']
}

export class RevisionAssetRepository {
  static #data: ReadonlyArray<RevisionAssetDoc> = []
}
