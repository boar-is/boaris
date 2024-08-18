import type { Doc } from '~/lib/db/_shared'

export type UserDoc = Doc & {
  name: string
  slug: string
}

export const userDocs = [] satisfies ReadonlyArray<UserDoc>
