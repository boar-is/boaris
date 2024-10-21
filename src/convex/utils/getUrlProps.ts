import type { StorageReader } from 'convex/server'
import type { Id } from '~/convex/_generated/dataModel'

export const getUrlProps = (storage: StorageReader) => ({
  getUrl: (id: Id<'_storage'>) =>
    storage.getUrl(id).then((it) => it ?? undefined),
})
