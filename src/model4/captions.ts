import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { JsonContent, jsonContent } from './jsonContent'

export const captions = v.object({
  revisionId: v.id('revisions'),
  content: jsonContent,
})

export class Captions extends Schema.Class<Captions>('Captions')({
  content: JsonContent,
}) {
  static encodedFromEntity({
    content,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
    }
  }
}
