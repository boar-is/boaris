import type { ChangeSpec, EditorState } from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert)

export const Action = Schema.Union(ActionInsert)
export const actionEncodedFromEntity = (
  a: Infer<typeof action>,
): typeof Action.Encoded =>
  Match.value(a).pipe(
    Match.when({ type: 'insert' }, ActionInsert.encodedFromEntity),
    Match.exhaustive,
  )

export const getCmChangesFromActions =
  (state: EditorState) =>
  (actions: ReadonlyArray<typeof Action.Type>) =>
  (anchor: number | undefined, head: number | undefined): ChangeSpec => {
    if (!head) {
      // reset to the initial
    } else if (!anchor || anchor < head) {
      for (let i = anchor ? anchor + 1 : 0; i <= head; i++) {
        // up to head
      }
    } else if (anchor > head) {
      for (let i = anchor; i > head; i--) {
        // down to the head
      }
    }
  }
