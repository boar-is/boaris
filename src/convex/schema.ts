import { defineSchema, defineTable } from 'convex/server'
import { asset } from '~/model/asset'
import { captions } from '~/model/captions'
import { layout } from '~/model/layout'
import { post } from '~/model/post'
import { postAuthor } from '~/model/postAuthor'
import { postTag } from '~/model/postTag'
import { project } from '~/model/project'
import { revision } from '~/model/revision'
import { tag } from '~/model/tag'
import { user } from '~/model/user'
import { workspace } from '~/model/workspace'
import { workspaceMember } from '~/model/workspaceMember'

const schema = defineSchema({
  assets: defineTable(asset).index('by_revisionId', ['revisionId']),
  captions: defineTable(captions).index('by_revisionId', ['revisionId']),
  layouts: defineTable(layout).index('by_revisionId', ['revisionId']),
  posts: defineTable(post).index('by_projectId_slug', ['projectId', 'slug']),
  postAuthors: defineTable(postAuthor)
    .index('by_postId', ['postId'])
    .index('by_userId', ['userId']),
  postTags: defineTable(postTag)
    .index('by_postId', ['postId'])
    .index('by_tagId', ['tagId']),
  projects: defineTable(project).index('by_workspaceId_slug', [
    'workspaceId',
    'slug',
  ]),
  revisions: defineTable(revision),
  tags: defineTable(tag)
    .index('by_slug', ['slug'])
    .index('by_projectId_slug', ['projectId', 'slug']),
  users: defineTable(user).index('by_slug', ['slug']),
  workspaces: defineTable(workspace).index('by_slug', ['slug']),
  workspaceMembers: defineTable(workspaceMember)
    .index('by_workspaceId', ['workspaceId'])
    .index('by_userId', ['userId']),
})

export default schema
