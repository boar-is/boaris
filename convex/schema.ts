import { defineSchema } from 'convex/server'
import { chunks } from './tables/chunks'
import { postAuthors } from './tables/post-authors'
import { postTags } from './tables/post-tags'
import { posts } from './tables/posts'
import { projects } from './tables/projects'
import { revisions } from './tables/revisions'
import { tags } from './tables/tags'
import { users } from './tables/users'
import { workspaceMembers } from './tables/workspace-members'
import { workspaces } from './tables/workspaces'

const schema = defineSchema({
  chunks,
  postAuthors,
  postTags,
  posts,
  projects,
  revisions,
  tags,
  users,
  workspaceMembers,
  workspaces,
})

export default schema
