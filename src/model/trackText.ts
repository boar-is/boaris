import type {
  ChangeSet,
  EditorSelection,
  EditorState,
} from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { changeSetFromActionInsertSpec } from '~/model/actionInsertSpec'
import { editorSelectionFromActionSelect } from '~/model/actionSelect'
import type { Action, action } from './action'
import { TrackBase, trackBase } from './trackBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const trackText = v.object({
  ...trackBase.fields,
  type: v.literal('text'),
  value: v.string(),
})

export class TrackText extends TrackBase.extend<TrackText>('TrackText')({
  type: Schema.Literal('text'),
  value: Schema.String,
}) {
  static encodedFromEntity(actions: Array<Infer<typeof action>>) {
    return ({
      type,
      value,
      ...base
    }: Infer<typeof trackText>): typeof TrackText.Encoded => ({
      ...TrackBase.encodedFromEntity(base, actions),
      type,
      value,
    })
  }
}

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
