import { pp1 } from '~/model/_no-db-helpers'
import type { LayoutChange } from '~/model/layoutChange'

const lc1 = (pos: number, areas: string): typeof LayoutChange.Encoded => ({
  postSlug: 'nextjs-metadata',
  offset: pp1(pos),
  areas,
})

export const layoutChangeRepository: ReadonlyArray<
  typeof LayoutChange.Encoded
> = []
