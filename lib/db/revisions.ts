import type { Doc } from './_shared'
import type { PostDoc } from './posts'

type Interpolation<T = number> = Array<[input: number, output: T]>

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
  files: Array<{
    id: string
    path: string
    /**
     * `null` means not created yet or deleted
     */
    initialValue: string
    /**
     * `null` output's for void, i.e., nothing happens
     */
    interpolation: Interpolation<{
      interpolation: Interpolation
    } | null>
  }>
}

export const revisionDocs: Array<RevisionDoc> = []
