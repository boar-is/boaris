import type { Doc } from '~/lib/db/_shared'

export type WorkspaceDoc = Doc & {
  name: string
  slug: string
}

export const workspaceDocs = [] satisfies ReadonlyArray<WorkspaceDoc>
