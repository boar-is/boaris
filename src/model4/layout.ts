import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { LayoutChange, layoutChange } from './layoutChange'
import { LayoutMode, layoutMode } from './layoutMode'

export const layout = v.object({
  revisionId: v.id('revisions'),
  modes: v.array(layoutMode),
  changes: v.array(layoutChange),
})

export class Layout extends Schema.Class<Layout>('Layout')({
  modes: Schema.HashSet(LayoutMode),
  changes: Schema.Array(LayoutChange),
}) {
  static encodedFromEntity({
    modes,
    changes,
  }: Infer<typeof layout>): typeof Layout.Encoded {
    return {
      modes,
      changes: changes.map(LayoutChange.encodedFromEntity),
    }
  }
}
