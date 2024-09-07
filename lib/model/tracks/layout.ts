import type { Delta } from 'jsondiffpatch'
import type { Recording, TrackBase } from '~/lib/model/tracks/_shared'

export type LayoutGroup = {
  _id: string
  direction: 'horizontal' | 'vertical'
  content: Array<LayoutGroupItem>
}
export type LayoutGroupItem = {
  _id: string
  content:
    | LayoutGroup
    | {
        trackId: TrackBase['_id']
        defaultSize: number
      }
}

export type LayoutValue = {}
export type LayoutValueDelta = Delta

export type LayoutRecording = Recording<
  {
    type: 'delta'
    delta: LayoutValueDelta
  },
  LayoutValue
>

export type LayoutTrack = TrackBase &
  (
    | {
        path: `.meta/primary.layout`
        initialValueDelta: LayoutValue
        recordings: Array<LayoutRecording>
      }
    | {
        path: `.meta/${string}.layout`
        primaryLayoutTrackId: LayoutTrack['_id']
        overridesDelta: LayoutValueDelta
      }
  )
