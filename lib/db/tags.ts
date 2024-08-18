import type { Doc } from '~/lib/db/_shared'

export type TagDoc = Doc & {
  name: string
  icon: string
}

export const tagDocs = [] satisfies ReadonlyArray<TagDoc>
