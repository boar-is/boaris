import type { StorageReader } from 'convex/server'
import type { Id } from '~/convex/_generated/dataModel'

export type PropsWithGetUrl = {
  getUrl: ReturnType<typeof getUrl>
}

export const getUrlProps = (storage: StorageReader): PropsWithGetUrl => ({
  getUrl: getUrl(storage),
})

export const getUrl = (storage: StorageReader) => (id: Id<'_storage'>) =>
  storage.getUrl(id).then((it) => it ?? undefined)
