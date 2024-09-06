import type { TrackBase } from '~/lib/model/tracks/_shared'

export type LayoutTrack = TrackBase & {
  path: '.meta/layout'
  // TODO recording or not recording?
}
