import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'

export const tag = v.object({
  slug: v.string(),
  name: v.string(),
  /**
   * If undefined, then the tag is global
   */
  projectId: v.optional(v.id('projects')),
})

export class Tag extends S.Class<Tag>('Tag')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
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
