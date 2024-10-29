import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { JsonContentSchema } from '~/lib/prosemirror/json-content-schema'

export const captions = v.object({
  revisionId: v.id('revisions'),
  content: v.any(),
})

export class Captions extends Schema.Class<Captions>('Captions')({
  content: JsonContentSchema,
}) {
  static encodedFromEntity({
    content,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
    }
  }
}
