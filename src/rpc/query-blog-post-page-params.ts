import { postRepository } from '~/src/domain/posts/post'

export type BlogPostPageParams = {
  postSlug: string
}

export const queryBlogPostPageStaticParams = async (): Promise<
  ReadonlyArray<BlogPostPageParams>
> => {
  return postRepository
    .filter((it) => it.publishedRevisionId)
    .map((it) => ({ postSlug: it.slug }))
}
