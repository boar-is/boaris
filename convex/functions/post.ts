import { query } from '~/convex/_generated/server'
import { post } from '~/convex/values/posts/post'
import { project } from '~/convex/values/projects/project'
import { workspace } from '~/convex/values/workspaces/workspace'
import { Timestamp, readable } from '~/model/timestamp'

export const params = query({
  handler: async ({ db }) => {
    const posts = await db.query('posts').order('desc').take(100)

    const projects = await Promise.all(posts.map((it) => db.get(it.projectId)))

    const workspaces = await Promise.all(
      projects.map((it) => it && db.get(it.workspaceId)),
    )

    return posts.map((post, index) => ({
      workspaceSlug: workspaces[index]?.slug,
      projectSlug: projects[index]!.slug,
      postSlug: post.slug,
    }))
  },
})

export const page = query({
  args: {
    workspaceSlug: workspace.fields.slug,
    projectSlug: project.fields.slug,
    postSlug: post.fields.slug,
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug, postSlug },
  ) => {
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

    const post = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) =>
        q.eq('projectId', project._id).eq('slug', postSlug),
      )
      .unique()

    if (!post?.publishedRevisionId) {
      return null
    }

    const revision = await db.get(post.publishedRevisionId)

    if (!revision) {
      return null
    }

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
      Promise.all(postTags.map((it) => db.get(it.tagId).then((it) => it!))),
      Promise.all(
        postAuthors.map((it) => db.get(it.authorId).then((it) => it!)),
      ),
      post.thumbnailId && storage.getUrl(post.thumbnailId),
    ])

    const captions = revision.captions && {
      value: revision.captions.value,
      interpolation: revision.captions.interpolation,
    }

    const layouts = revision.layouts && {
      primary: {
        modes: revision.layouts.primary.modes,
        /**
         * this field should be mapped as-is due to the patching logic, see changesDelta from overrides
         */
        changes: revision.layouts.primary.changes,
      },
      overrides: revision.layouts.overrides
        ?.filter((it) => !it.disabled)
        .map((it) => ({
          modes: it.modes,
          minWidthPx: it.minWidthPx,
          changesDelta: it.changesDelta,
        })),
    }

    const tracks =
      revision.tracks &&
      (await Promise.all(
        revision.tracks.map(async (track) => {
          switch (track.type) {
            case 'dynamic-image': {
              return {
                id: track.id,
                name: track.name,
                type: track.type,
                url: track.storageId && (await storage.getUrl(track.storageId)),
                caption: track.caption,
              }
            }
            case 'static-image': {
              return {
                id: track.id,
                name: track.name,
                type: track.type,
                url: track.storageId && (await storage.getUrl(track.storageId)),
                caption: track.caption,
                alt: track.alt,
              }
            }
            case 'text': {
              return {
                id: track.id,
                name: track.name,
                type: track.type,
                value: track.value,
              }
            }
            default:
              throw new Error(`Unknown track type '${track['type']}'`)
          }
        }),
      ))

    return {
      post: {
        title: post.title,
        lead: post.lead,
        description: post.description,
        date: readable(Timestamp(post._creationTime)),
        thumbnailUrl,
      },
      tags: tags.map((it) => ({
        slug: it.slug,
        name: it.name,
      })),
      authors: authors.map((it) => ({
        slug: it.slug,
        name: it.name,
        avatarUrl: it.avatarUrl,
      })),
      captions,
      layouts,
      tracks,
    }
  },
})
