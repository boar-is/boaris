import type { Doc } from '~/lib/db/_shared'

export type StorageDoc = Doc & {
  src: string
}

export const storageDocs = [] satisfies ReadonlyArray<StorageDoc>
