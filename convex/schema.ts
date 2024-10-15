import { defineSchema, defineTable } from 'convex/server'
import { chunk } from './values/chunks/chunk'
import { post } from './values/posts/post'
import { postAuthor } from './values/posts/postAuthor'
import { postTag } from './values/posts/postTag'
import { project } from './values/projects/project'
import { revision } from './values/revisions/revision'
import { tag } from './values/tags/tag'
import { user } from './values/users/user'
import { workspace } from './values/workspaces/workspace'
import { workspaceMember } from './values/workspaces/workspaceMember'

const schema = defineSchema({
  chunks: defineTable(chunk),
  postAuthors: defineTable(postAuthor)
    .index('by_postId', ['postId'])
    .index('by_authorId', ['authorId']),
  postTags: defineTable(postTag)
    .index('by_postId', ['postId'])
    .index('by_tagId', ['tagId']),
  posts: defineTable(post).index('by_projectId_slug', ['projectId', 'slug']),
  projects: defineTable(project).index('by_workspaceId_slug', [
    'workspaceId',
    'slug',
  ]),
  revisions: defineTable(revision),
  tags: defineTable(tag)
    .index('by_slug', ['slug'])
    .index('by_projectId_slug', ['projectId', 'slug']),
  users: defineTable(user).index('by_slug', ['slug']),
  workspaceMembers: defineTable(workspaceMember)
    .index('by_workspaceId', ['workspaceId'])
    .index('by_memberId', ['memberId']),
  workspaces: defineTable(workspace).index('by_slug', ['slug']),
})

export default schema
