import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'

export const project = v.object({
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
})

export class Project extends S.Class<Project>('Project')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
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
