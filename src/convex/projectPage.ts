import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Post } from '~/model/post'
import { Project } from '~/model/project'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'

export class ProjectPageQueryResult extends S.Class<ProjectPageQueryResult>(
  'ProjectPageQueryResult',
)({
  project: Project,
  posts: S.Array(Post),
  tagsByPostSlug: S.HashMap({
    key: Post.fields.slug,
    value: S.Array(Tag),
  }),
  authorsByPostSlug: S.HashMap({
    key: Post.fields.slug,
    value: S.Array(User),
  }),
}) {}

const projectPage = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug },
  ): Promise<typeof ProjectPageQueryResult.Encoded | null> => {
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

    const getUrl = getUrlProps(storage)

    const [posts, tagsByPostSlug, authorsByPostSlug] = await Promise.all([
      Promise.all(latestPosts.map(Post.encodedFromEntity(getUrl))),
      Promise.all(
        latestPosts.map(async (post) => {
          const postTags = await db
            .query('postTags')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect()

          return [
            post.slug,
            await Promise.all(
              postTags.map(async (it) =>
                Tag.encodedFromEntity(await db.get(it.tagId).then((it) => it!)),
              ),
            ),
          ] as const
        }),
      ),
      Promise.all(
        latestPosts.map(async (post) => {
          const postAuthors = await db
            .query('postAuthors')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect()

          return [
            post.slug,
            await Promise.all(
              postAuthors.map(async (it) =>
                User.encodedFromEntity(
                  await db.get(it.authorId).then((it) => it!),
                ),
              ),
            ),
          ] as const
        }),
      ),
    ])

    return {
      project: Project.encodedFromEntity(project),
      posts,
      tagsByPostSlug,
      authorsByPostSlug,
    }
  },
})

export default projectPage
