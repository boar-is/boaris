import type { Doc } from './_shared'
import type { PostDoc } from './posts'
import type { RecordingDoc } from './recordings'

export type Interpolation<T = number> = Array<[input: number, output: T]>

export type RevisionFile = {
  _id: string
  path: string
  /**
   * `null` means not created yet or deleted
   */
  initialValue: string
  /**
   * `null` output's for void, i.e., nothing happens
   */
  interpolation: Interpolation<{
    recordingId: RecordingDoc['_id']
    interpolation: Interpolation
  } | null>
}

export type RevisionDoc = Doc & {
  postId: PostDoc['_id']
  captions?:
    | {
        /**
         * JSON.stringified JSONContent
         */
        content: string
        interpolation: Interpolation
      }
    | undefined
  /**
   * Breakpoints, like framer, a single unique track
   */
  layouts: unknown
  files: Array<RevisionFile>
}

export const revisionDocs: Array<RevisionDoc> = []
