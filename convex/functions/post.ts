import { query } from '~/convex/_generated/server'
import { postFields } from '~/convex/fields/posts'
import { projectFields } from '~/convex/fields/projects'
import { workspaceFields } from '~/convex/fields/workspaces'
import { formatCreationTime } from '~/convex/utils/date'
import { getUrl } from '~/convex/utils/getUrl'
import { ensurePresent } from '~/utils/ensure-present'

export const params = query({
  handler: async ({ db }) => {
    const posts = await db.query('posts').order('desc').take(100)

    const projects = await Promise.all(posts.map((it) => db.get(it.projectId)))

    const workspaces = await Promise.all(
      projects.map((it) => it && db.get(it.workspaceId)),
    )

    return posts.map((post, index) => ({
      workspaceSlug: ensurePresent(workspaces[index]).slug,
      projectSlug: ensurePresent(projects[index]).slug,
      postSlug: post.slug,
    }))
  },
})

export const page = query({
  args: {
    workspaceSlug: workspaceFields.slug,
    projectSlug: projectFields.slug,
    postSlug: postFields.slug,
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

    const thumbnailUrl = await getUrl(storage, post.thumbnailId)

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
                url: await getUrl(storage, track.storageId),
                caption: track.caption,
              }
            }
            case 'static-image': {
              return {
                id: track.id,
                name: track.name,
                type: track.type,
                url: await getUrl(storage, track.storageId),
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
        date: formatCreationTime(post._creationTime),
        thumbnailUrl,
      },
      captions,
      layouts,
      tracks,
    }
  },
})
