import type { StorageReader } from 'convex/server'
import { ensureDefined } from '~/utils/ensure-defined'
import type { Id } from '../_generated/dataModel'

export const createStorageMap = async (
  storage: StorageReader,
  ...ids: Array<Id<'_storage'> | null | undefined>
) => {
  const uniqueIds = [...new Set(ids)].filter(Boolean)

  const urls = await Promise.all(uniqueIds.map((it) => storage.getUrl(it)))

  const map = urls.reduce((map, url, index) => {
    if (url) {
      const key = ensureDefined(uniqueIds[index])
      map.set(key, url)
    }
    return map
  }, new Map<Id<'_storage'>, string>())

  return {
    getStorageUrl: (key: Id<'_storage'> | null | undefined) =>
      (key && map.get(key)) ?? null,
  }
}
