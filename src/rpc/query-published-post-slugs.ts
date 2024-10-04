import { postRepository } from '~/src/domain/posts/post'

export const queryPublishedPostSlugs = async (): Promise<
  ReadonlyArray<string>
> => {
  return postRepository
    .filter((it) => it.publishedRevisionId)
    .map((it) => it.slug)
}
