import { defineSchema, defineTable } from 'convex/server'
import { post } from '~/model/post'
import { postAuthor } from '~/model/postAuthor'
import { postTag } from '~/model/postTag'
import { project } from '~/model/project'
import { revision } from '~/model/revision'
import { tag } from '~/model/tag'
import { trackChunk } from '~/model/trackChunk'
import { user } from '~/model/user'
import { workspace } from '~/model/workspace'
import { workspaceMember } from '~/model/workspaceMember'

const schema = defineSchema({
  posts: defineTable(post).index('by_projectId_slug', ['projectId', 'slug']),
  postAuthors: defineTable(postAuthor)
    .index('by_postId', ['postId'])
    .index('by_authorId', ['authorId']),
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
  trackChunks: defineTable(trackChunk).index('by_revisionId', ['revisionId']),
  users: defineTable(user).index('by_slug', ['slug']),
  workspaces: defineTable(workspace).index('by_slug', ['slug']),
  workspaceMembers: defineTable(workspaceMember)
    .index('by_workspaceId', ['workspaceId'])
    .index('by_memberId', ['memberId']),
})

export default schema
