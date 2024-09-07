import type { Delta } from '~/lib/diffpatcher'
import type { Doc } from '~/lib/model/docs/_shared'
import { type CaptionsTrack, captionsTracks } from '../tracks/captions'
import { type ImageTrack, imageTracks } from '../tracks/image'
import type { TextTrack } from '../tracks/text'
import type { VideoTrack } from '../tracks/video'

export type RevisionValue = {
  tracks: Array<CaptionsTrack | ImageTrack | TextTrack | VideoTrack>
}

export type RevisionDoc = Doc &
  (
    | {
        parentId: null
        value: RevisionValue
      }
    | {
        parentId: RevisionDoc['_id']
        delta: Delta
      }
  )

export const revisionDocs: Array<RevisionDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    parentId: null,
    value: {
      tracks: [
        ...captionsTracks,
        ...imageTracks,
        {
          _id: '2',
          path: '.meta/shadow-palette-initial.mp4',
          storageId: '4',
        },
        {
          _id: '3',
          path: '.meta/css-snippet.webp',
          storageId: '5',
        },
      ],
    },
  },
]
