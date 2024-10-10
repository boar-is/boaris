import { defineSchema } from 'convex/server'
import { chunks } from '~/convex/tables/chunks'
import { postAuthors } from '~/convex/tables/postAuthors'
import { postTags } from '~/convex/tables/postTags'
import { posts } from '~/convex/tables/posts'
import { projects } from '~/convex/tables/projects'
import { revisions } from '~/convex/tables/revisions'
import { tags } from '~/convex/tables/tags'
import { users } from '~/convex/tables/users'
import { workspaceMembers } from '~/convex/tables/workspaceMembers'
import { workspaces } from '~/convex/tables/workspaces'

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
