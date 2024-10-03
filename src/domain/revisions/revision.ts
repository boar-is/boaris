import type { Delta } from '~/src/shared/delta'
import type { Entity } from '~/src/shared/entity'
import type { RevisionValue } from './revision-value'

export type Revision = Entity &
  (
    | {
        readonly parentId: null
        readonly value: RevisionValue
      }
    | {
        readonly parentId: Entity['_id']
        readonly valueDelta: Delta
      }
  )
