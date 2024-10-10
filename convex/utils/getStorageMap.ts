import type { StorageReader } from 'convex/server'
import { ensureDefined } from '~/src/lib/utils/ensure'
import type { Id } from '../_generated/dataModel'

export const getStorageMap = async (
  storage: StorageReader,
  ...ids: Array<Id<'_storage'> | null | undefined>
) => {
  const uniqueIds = [...new Set(ids)].filter(Boolean)

  const urls = await Promise.all(uniqueIds.map((it) => storage.getUrl(it)))

  return urls.reduce(
    (record, url, index) => {
      if (url) {
        const key = ensureDefined(uniqueIds[index])
        record[key] = url
      }
      return record
    },
    {} as Record<Id<'_storage'>, string>,
  )
}
