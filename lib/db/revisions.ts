import type { Doc, Interpolation } from './_shared'
import type { PostDoc } from './posts'
import type { ImageTrack } from './tracks/image'
import type { TextTrack } from './tracks/text'
import type { VideoTrack } from './tracks/video'

export type RevisionDoc = Doc & {
  postId: PostDoc['_id']
  captions?:
    | {
        /**
         * JSON.stringified JSONContent
         */
        content: string
        progressInterpolation: Interpolation
      }
    | undefined
  /**
   * Breakpoints, like framer, a single unique track
   */
  layouts: unknown
  files: Array<TextTrack | ImageTrack | VideoTrack>
}

export const revisionDocs: Array<RevisionDoc> = []
