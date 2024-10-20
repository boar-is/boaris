import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'

const postPage = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
    postSlug: v.string(),
  },
})

export default postPage
