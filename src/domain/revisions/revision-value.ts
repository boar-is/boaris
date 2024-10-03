import type { Captions } from './captions/captions'
import type { Layouts } from './layouts/layouts'
import type { Track } from './tracks/track'

export type RevisionValue = {
  readonly captions?: Captions | undefined
  readonly layouts?: Layouts | undefined
  readonly tracks: ReadonlyArray<Track>
}
