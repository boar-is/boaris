import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

export const project = v.object({
  slug: v.string(),
  name: v.string(),
  workspaceId: v.id('workspaces'),
})

export class Project extends S.Class<Project>('Project')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
}) {}
