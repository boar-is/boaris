import type { Entity } from '~/src/shared/entity'
import type { Captions } from './captions/captions'
import type { Layouts } from './layouts/layouts'
import type { Track } from './tracks/track'

export type Revision = Entity & {
  readonly captions: Captions | null
  readonly layouts: Layouts | null
  readonly tracks: Record<string, Track>
}
