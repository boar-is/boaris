import type { Captions } from './captions/captions'
import type { Layouts } from './layouts/layouts'
import type { Track } from './tracks/track'

export type RevisionValue = {
  readonly captions: Captions | null
  readonly layouts: Layouts | null
  readonly tracks: ReadonlyArray<Track>
}
