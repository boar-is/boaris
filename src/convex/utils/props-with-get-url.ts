import type { StorageId } from 'convex/server'

export type PropsWithGetUrl = {
  getUrl: (id: StorageId) => Promise<string | undefined>
}
