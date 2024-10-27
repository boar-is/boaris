import type {
  ChangeSet,
  EditorSelection,
  EditorState,
} from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'
import { changeSetFromActionInsertSpec } from '~/model/actionInsertSpec'
import {
  ActionSelect,
  actionSelect,
  editorSelectionFromActionSelect,
} from '~/model/actionSelect'
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

export const seekCodeMirrorActions =
  (state: EditorState) =>
  (actions: ReadonlyArray<typeof Action.Type>) =>
  (initialState: string) =>
  (anchor: number | undefined, head: number | undefined) => {
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

    let changes: ChangeSet | undefined
    let selection: EditorSelection | undefined

    const applyAction = (action: typeof Action.Type, inverted = false) => {
      switch (action.type) {
        case 'insert': {
          const spec = inverted ? action.backwardSpec : action.forwardSpec
          const changeSet = changeSetFromActionInsertSpec(spec)
          changes = changes ? changes.compose(changeSet) : changeSet
          break
        }
        case 'select': {
          selection = editorSelectionFromActionSelect(action)
          break
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
