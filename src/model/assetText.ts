import {
  ChangeSet,
  type EditorSelection,
  type EditorState,
} from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ChangeSetSchema } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionSchema } from '~/lib/codemirror/editor-selection-schema'
import { AssetBase, assetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const assetText = v.object({
  ...assetBase.fields,
  type: v.literal('text'),
  value: v.string(),
  changes: v.array(v.any()),
})

export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  type: Schema.Literal('text'),
  value: Schema.String,
  changes: Schema.Array(
    Schema.Tuple(
      /**
       * The offset
       */
      Schema.Number,
      /**
       * @see https://codemirror.net/docs/ref/#state.TransactionSpec
       */
      Schema.Tuple(ChangeSetSchema, EditorSelectionSchema),
    ),
  ),
}) {
  static encodedFromEntity({
    type,
    value,
    changes,
    ...base
  }: Infer<typeof assetText>): typeof AssetText.Encoded {
    return {
      ...AssetBase.encodedFromEntity(base),
      type,
      value,
      changes,
    }
  }
}

export type AssetTextChange = (typeof AssetText.Type)['changes'][number]

export const seekCodeMirrorActions =
  (state: EditorState) =>
  (initialState: string) =>
  (
    forwards: ReadonlyArray<AssetTextChange>,
    backwards: ReadonlyArray<AssetTextChange>,
  ) =>
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

    let changes = ChangeSet.empty(state.doc.length)
    let selection: EditorSelection | undefined

    const applyChange = (change: AssetTextChange) => {
      const [changeSet, editorSelection] = change[1]
      changes = changes.compose(changeSet)
      selection = editorSelection
    }

    if (!anchor || anchor < head) {
      for (let i = anchor ? anchor + 1 : 0; i <= head; i++) {
        applyChange(forwards[i]!)
      }
    } else if (anchor > head) {
      for (let i = anchor; i > head; i--) {
        applyChange(backwards[i]!)
      }
    }

    return {
      changes,
      selection,
      scrollIntoView: true,
      sequential: true,
    }
  }
