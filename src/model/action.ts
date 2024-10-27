import {
  type ChangeSpec,
  EditorSelection,
  type EditorState,
  type TransactionSpec,
} from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'
import { ActionSelect, actionSelect } from '~/model/actionSelect'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert, actionSelect)

export const Action = Schema.Union(ActionInsert, ActionSelect)
export const actionEncodedFromEntity = (
  a: Infer<typeof action>,
): typeof Action.Encoded =>
  Match.value(a).pipe(
    Match.when({ type: 'insert' }, ActionInsert.encodedFromEntity),
    Match.when({ type: 'select' }, ActionSelect.encodedFromEntity),
    Match.exhaustive,
  )

export const getCmTransactionSpecFromActions =
  (state: EditorState) =>
  (actions: ReadonlyArray<typeof Action.Type>) =>
  (initialState: string) =>
  (anchor: number | undefined, head: number | undefined): TransactionSpec => {
    if (!head) {
      return {
        changes: {
          from: 0,
          to: state.doc.length,
          insert: initialState,
        },
        selection: undefined,
        scrollIntoView: true,
      }
    }

    const changes: Array<ChangeSpec> = []
    let selection: EditorSelection | undefined = undefined

    const applyAction = (action: typeof Action.Type, inverted = false) => {
      switch (action.type) {
        case 'insert': {
          return changes.push({
            from: 1,
            to: 2,
            insert: action.value ?? '',
          })
        }
        case 'select': {
          selection = EditorSelection.create(
            action.ranges.map((it) =>
              EditorSelection.range(it.anchor, it.head),
            ),
            action.mainIndex,
          )
          return
        }
      }
    }

    if (!anchor || anchor < head) {
      for (let i = anchor ? anchor + 1 : 0; i <= head; i++) {
        applyAction(actions[i]!)
      }
    } else if (anchor > head) {
      for (let i = anchor; i > head; i--) {
        applyAction(actions[i]!, true)
      }
    }

    return {
      changes,
      selection,
      scrollIntoView: true,
      sequential: true,
    }
  }
