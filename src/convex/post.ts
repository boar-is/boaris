import { Schema } from 'effect'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { assetEncodedFromEntity } from '~/model/asset'
import { Captions } from '~/model/captions'
import { Layout } from '~/model/layout'
import { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'
import { PostRequest } from '~/rpc/post-request'

const post = query({
  handler: async (
    { db, storage },
    args: { workspaceSlug: string; projectSlug: string; postSlug: string },
  ): Promise<(typeof PostRequest)['success']['Encoded']> => {
    const { workspaceSlug, projectSlug, postSlug } =
      Schema.decodeUnknownSync(PostRequest)(args)

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

    const postEntity = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) =>
        q.eq('projectId', project._id).eq('slug', postSlug),
      )
      .unique()

    if (!postEntity?.publishedRevisionId) {
      return null
    }

    const revisionEntity = await db.get(postEntity.publishedRevisionId)

    if (!revisionEntity) {
      return null
    }

    const getUrl = getUrlProps(storage)

    const [post, postTags, postAuthors, captions, layout, assetEntities] =
      await Promise.all([
        Post.encodedFromEntity(postEntity),
        db
          .query('postTags')
          .withIndex('by_postId', (q) => q.eq('postId', postEntity._id))
          .collect(),
        db
          .query('postAuthors')
          .withIndex('by_postId', (q) => q.eq('postId', postEntity._id))
          .collect(),
        db
          .query('captions')
          .withIndex('by_revisionId', (q) =>
            q.eq('revisionId', revisionEntity._id),
          )
          .unique(),
        db
          .query('layouts')
          .withIndex('by_revisionId', (q) =>
            q.eq('revisionId', revisionEntity._id),
          )
          .unique(),
        db
          .query('assets')
          .withIndex('by_revisionId', (q) =>
            q.eq('revisionId', revisionEntity._id),
          )
          .collect(),
      ])

    const [tags, authors, revision, assets] = await Promise.all([
      Promise.all(
        postTags.map((it) =>
          db.get(it.tagId).then((it) => Tag.encodedFromEntity(it!)),
        ),
      ),
      Promise.all(
        postAuthors.map((it) =>
          db.get(it.userId).then((it) => User.encodedFromEntity(it!)),
        ),
      ),
      Revision.encodedFromEntity(revisionEntity, getUrl),
      Promise.all(assetEntities.map(assetEncodedFromEntity(getUrl))),
    ])

    return {
      post,
      tags,
      authors,
      revision,
      captions: Captions.encodedFromEntity(captions!),
      layout: Layout.encodedFromEntity(layout!),
      assets,
    }
  },
})

export default post
