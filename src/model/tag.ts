import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const tag = v.object({
  slug: v.string(),
  name: v.string(),
  /**
   * If undefined, then the tag is global
   */
  projectId: v.optional(v.id('projects')),
})

export class Tag extends Schema.Class<Tag>('Tag')({
  slug: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
}) {
  static encodedFromEntity({
    slug,
    name,
  }: Infer<typeof tag>): typeof Tag.Encoded {
    return {
      slug,
      name,
    }
  }
}
