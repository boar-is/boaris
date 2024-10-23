import { query } from '~/convex/_generated/server'
import type { ProjectSlugsRequest } from '~/rpc/project-slugs-request'

const projectSlugs = query({
  handler: async ({
    db,
  }): Promise<(typeof ProjectSlugsRequest)['success']['Encoded']> => {
    const projects = await db.query('projects').order('desc').take(100)

    const workspaces = await Promise.all(
      projects.map((it) => db.get(it.workspaceId)),
    )

    return projects.map((project, index) => ({
      workspaceSlug: workspaces[index]!.slug,
      projectSlug: project.slug,
    }))
  },
})

export default projectSlugs
