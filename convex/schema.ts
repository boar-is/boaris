import { defineSchema, defineTable } from 'convex/server'
import { chunkFields } from './fields/chunks'
import { postAuthorFields } from './fields/postAuthors'
import { postTagFields } from './fields/postTags'
import { postFields } from './fields/posts'
import { projectFields } from './fields/projects'
import { revisionFields } from './fields/revisions'
import { tagFields } from './fields/tags'
import { userFields } from './fields/users'
import { workspaceMemberFields } from './fields/workspaceMembers'
import { workspaceFields } from './fields/workspaces'

const schema = defineSchema({
  chunks: defineTable(chunkFields),
  postAuthors: defineTable(postAuthorFields)
    .index('by_postId', ['postId'])
    .index('by_authorId', ['authorId']),
  postTags: defineTable(postTagFields)
    .index('by_postId', ['postId'])
    .index('by_tagId', ['tagId']),
  posts: defineTable(postFields).index('by_projectId_slug', [
    'projectId',
    'slug',
  ]),
  projects: defineTable(projectFields).index('by_workspaceId_slug', [
    'workspaceId',
    'slug',
  ]),
  revisions: defineTable(revisionFields),
  tags: defineTable(tagFields)
    .index('by_slug', ['slug'])
    .index('by_projectId_slug', ['projectId', 'slug']),
  users: defineTable(userFields).index('by_slug', ['slug']),
  workspaceMembers: defineTable(workspaceMemberFields)
    .index('by_workspaceId', ['workspaceId'])
    .index('by_memberId', ['memberId']),
  workspaces: defineTable(workspaceFields).index('by_slug', ['slug']),
})

export default schema
