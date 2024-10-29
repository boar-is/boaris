import { Schema } from 'effect'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Post } from '~/model/post'
import { Project } from '~/model/project'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'
import { ProjectRequest } from '~/rpc/project-request'

const project = query({
  handler: async (
    { db, storage },
    args: { workspaceSlug: string; projectSlug: string },
  ): Promise<(typeof ProjectRequest)['success']['Encoded']> => {
    const { workspaceSlug, projectSlug } =
      Schema.decodeUnknownSync(ProjectRequest)(args)

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

    const posts = await Promise.all(
      latestPosts.map(async (post) => {
        const [postTags, postAuthors, revision] = await Promise.all([
          db
            .query('postTags')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
          db
            .query('postAuthors')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
          // Checked above
          db.get(post.publishedRevisionId!),
        ])

        const [tags, authors] = await Promise.all([
          Promise.all(
            postTags.map(async (it) =>
              Tag.encodedFromEntity(await db.get(it.tagId).then((it) => it!)),
            ),
          ),
          Promise.all(
            postAuthors.map(async (it) =>
              User.encodedFromEntity(await db.get(it.userId).then((it) => it!)),
            ),
          ),
        ])

        return {
          post: Post.encodedFromEntity(post),
          revision: await Revision.encodedFromEntity(revision!, getUrl),
          tags,
          authors,
        }
      }),
    )

    return {
      project: Project.encodedFromEntity(project),
      posts,
    }
  },
})

export default project
