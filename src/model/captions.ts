import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { JsonContentFromSelf } from '~/lib/prosemirror/json-content-schema'

export const captions = v.object({
  revisionId: v.id('revisions'),
  content: v.any(),
})

export class Captions extends Schema.Class<Captions>('Captions')({
  content: JsonContentFromSelf,
}) {
  static encodedFromEntity({
    content,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
    }
  }
}
