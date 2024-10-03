import type { RevisionValue } from '~/src/lib/model/docs/revisions'
import type { Delta } from '~/src/shared/delta'
import type { Entity } from '~/src/shared/entity'

export type Revision = Entity &
  (
    | {
        parentId: null
        value: RevisionValue
      }
    | {
        parentId: Entity['_id']
        delta: Delta
      }
  )
