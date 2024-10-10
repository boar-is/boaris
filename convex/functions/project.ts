import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { createStorageMap } from '~/convex/utils/createStorageMap'
import { ensureNonNull, ensurePresent } from '~/src/lib/utils/ensure'

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
  args: { workspaceSlug: v.string(), projectSlug: v.string() },
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

    const posts = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) => q.eq('projectId', project._id))
      .filter((q) => q.not(q.eq('publishedRevisionId', undefined)))
      .order('desc')
      .take(25)

    const [postTags, postAuthors] = await Promise.all([
      Promise.all(
        posts.map((post) =>
          db
            .query('postTags')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
        ),
      ).then((it) => it.flat()),
      Promise.all(
        posts.map((post) =>
          db
            .query('postAuthors')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
        ),
      ).then((it) => it.flat()),
    ])

    const [tags, users] = await Promise.all([
      Promise.all(postTags.map((it) => db.get(it.tagId).then(ensureNonNull))),
      Promise.all(
        postAuthors.map((it) => db.get(it.authorId).then(ensureNonNull)),
      ),
    ])

    const { getStorageUrl } = await createStorageMap(
      storage,
      ...posts.map((it) => it.thumbnailId),
    )

    return {
      project: {
        _id: project._id,
        slug: project.slug,
        name: project.name,
        workspaceId: project.workspaceId,
      },
      posts: posts.map((it) => ({
        _id: it._id,
        slug: it.slug,
        title: it.title,
        lead: it.lead,
        description: it.description,
        thumbnailSrc: getStorageUrl(it.thumbnailId),
        projectId: it.projectId,
      })),
      postTags: postTags.map((it) => ({
        _id: it._id,
        postId: it.postId,
        tagId: it.tagId,
      })),
      postAuthors: postAuthors.map((it) => ({
        _id: it._id,
        postId: it.postId,
        authorId: it.authorId,
      })),
      tags: tags.map((it) => ({
        _id: it._id,
        slug: it.slug,
        name: it.name,
        isGlobal: it.projectId === undefined,
      })),
      users: users.map((it) => ({
        _id: it._id,
        slug: it.slug,
        name: it.name,
        avatarSrc: it.avatarSrc,
        socialLinks: workspace.socialLinks.map((it) => ({
          href: it.href,
          label: it.label,
        })),
      })),
    }
  },
})
