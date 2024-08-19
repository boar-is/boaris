import type { Doc } from '~/lib/db/_shared'
import type { AssetDoc } from './assets'
import type { RevisionDoc } from './revisions'

export type RevisionAssetDoc = Doc & {
  revisionId: RevisionDoc['_id']
  assetId: AssetDoc['_id']
}

export const revisionAssetDocs: ReadonlyArray<RevisionAssetDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    revisionId: '1',
    assetId: '1',
  },
]
