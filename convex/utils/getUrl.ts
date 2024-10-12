import type { StorageReader } from 'convex/server'
import type { Id } from '~/convex/_generated/dataModel'

export const getUrl = async (
  storage: StorageReader,
  id: Id<'_storage'> | null | undefined,
) => {
  return id ? storage.getUrl(id) : null
}
