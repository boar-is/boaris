import { defineSchema } from 'convex/server'
import { chunks } from './tables/chunks'
import { postAuthors } from './tables/postAuthors'
import { postTags } from './tables/postTags'
import { posts } from './tables/posts'
import { projects } from './tables/projects'
import { revisions } from './tables/revisions'
import { tags } from './tables/tags'
import { users } from './tables/users'
import { workspaceMembers } from './tables/workspaceMembers'
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
