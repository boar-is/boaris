import type { User } from '~/src/domain/users/user'
import type { Entity } from '~/src/shared/entity'
import type { Post } from './post'

export type PostAuthor = Entity & {
  readonly postId: Post['_id']
  readonly authorId: User['_id']
}

export const postAuthorRepository: ReadonlyArray<PostAuthor> = [
  {
    _id: 'L3foO3eTAtYi',
    _creationTime: Date.now(),
    postId: 'oclcmSQoOSCF',
    authorId: 'QcXfwMYqlHu5',
  },
]
