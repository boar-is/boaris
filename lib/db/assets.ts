import type { Doc } from '~/lib/db/_shared'

export type AssetDoc = Doc & {
  /**
   * `active` when is shown
   * `hidden` when is not yet created
   * `deleted` when in the trash
   * @default active
   */
  status?: 'active' | 'hidden' | 'deleted' | undefined
}

export const assetDocs = [] satisfies ReadonlyArray<AssetDoc>
