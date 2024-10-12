import { query } from '~/convex/_generated/server'
import { projectFields } from '~/convex/fields/projects'
import { workspaceFields } from '~/convex/fields/workspaces'
import { formatCreationTime } from '~/convex/utils/date'
import { getUrl } from '~/convex/utils/getUrl'
import { ensureNonNull } from '~/utils/ensure-non-null'
import { ensurePresent } from '~/utils/ensure-present'

export const params = query({
  handler: async ({ db }) => {
    const projects = await db.query('projects').order('desc').take(100)

    const workspaces = await Promise.all(
      projects.map((it) => db.get(it.workspaceId)),
    )

    return projects.map((project, index) => ({
      workspaceSlug: ensurePresent(workspaces[index]).slug,
      projectSlug: project.slug,
    }))
  },
})

export const page = query({
  args: {
    workspaceSlug: workspaceFields.slug,
    projectSlug: projectFields.slug,
  },
  handler: async ({ db, storage }, { workspaceSlug, projectSlug }) => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    const project = await db
      .query('projects')
      .withIndex('by_workspaceId_slug', (q) =>
        q.eq('workspaceId', workspace._id).eq('slug', projectSlug),
      )
      .unique()

    if (!project) {
      return project
    }

    const latestPosts = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) => q.eq('projectId', project._id))
      .filter((q) => q.not(q.eq('publishedRevisionId', undefined)))
      .order('desc')
      .take(25)

    const posts = await Promise.all(
      latestPosts.map(async (post) => {
        const [postTags, postAuthors] = await Promise.all([
          db
            .query('postTags')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
          db
            .query('postAuthors')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
        ])

        const [tags, authors, thumbnailUrl] = await Promise.all([
          Promise.all(
            postTags.map((it) => db.get(it.tagId).then(ensureNonNull)),
          ),
          Promise.all(
            postAuthors.map((it) => db.get(it.authorId).then(ensureNonNull)),
          ),
          getUrl(storage, post.thumbnailId),
        ])

        return {
          slug: post.slug,
          title: post.title,
          lead: post.lead,
          description: post.description,
          thumbnailUrl,
          date: formatCreationTime(post._creationTime),
          tags: tags.map((it) => ({
            slug: it.slug,
            name: it.name,
          })),
          authors: authors.map((it) => ({
            slug: it.slug,
            name: it.name,
            avatarUrl: it.avatarUrl,
          })),
        }
      }),
    )

    return {
      project: {
        name: project.name,
      },
      posts,
    }
  },
})
