import { query } from '~/convex/_generated/server'

export type PostParamsQueryResult = Array<{
  workspaceSlug: string
  projectSlug: string
  postSlug: string
}>

const postParams = query({
  handler: async ({ db }): Promise<PostParamsQueryResult> => {
    const posts = await db.query('posts').order('desc').take(100)

    const projects = await Promise.all(posts.map((it) => db.get(it.projectId)))

    const workspaces = await Promise.all(
      projects.map((it) => it && db.get(it.workspaceId)),
    )

    return posts.map((post, index) => ({
      workspaceSlug: workspaces[index]!.slug,
      projectSlug: projects[index]!.slug,
      postSlug: post.slug,
    }))
  },
})

export default postParams
