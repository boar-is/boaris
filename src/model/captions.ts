import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { JsonContentFromJson } from '~/lib/prosemirror/json-content-schema'

export const captions = v.object({
  revisionId: v.id('revisions'),
  content: v.string(),
})

export class Captions extends Schema.Class<Captions>('Captions')({
  content: JsonContentFromJson,
}) {
  static encodedFromEntity({
    content,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
    }
  }
}
