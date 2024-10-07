import type { Id } from '~/src/shared/id'
import type { Captions } from './captions/captions'
import type { Layouts } from './layouts/layouts'
import type { Track } from './tracks/track'

export type Revision = {
  _id: Id
  _creationTime: number
  captions: Captions | null
  layouts: Layouts | null
  tracks: Array<Track>
}
