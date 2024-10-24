import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const project = v.object({
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
})

export class Project extends Schema.Class<Project>('Project')({
  slug: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
}) {
  static encodedFromEntity({
    slug,
    name,
  }: Infer<typeof project>): typeof Project.Encoded {
    return {
      slug,
      name,
    }
  }
}
