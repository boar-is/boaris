import type { Entity } from '~/src/shared/entity'

export type PostAuthor = Entity & {
  readonly postId: Entity['_id']
  readonly authorId: Entity['_id']
}

export const postAuthorRepository: ReadonlyArray<PostAuthor> = [
  {
    _id: 'L3foO3eTAtYi',
    _creationTime: Date.now(),
    postId: 'oclcmSQoOSCF',
    authorId: 'QcXfwMYqlHu5',
  },
]
