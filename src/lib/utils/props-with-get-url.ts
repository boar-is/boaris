import type { Id } from '~/convex/_generated/dataModel'

export type PropsWithGetUrl = {
  getUrl: (id: Id<'_storage'>) => Promise<string | undefined>
}
