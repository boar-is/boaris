import {
  ChangeSet,
  type EditorSelection,
  type EditorState,
  type Text,
  type TransactionSpec,
} from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { Id } from '~/convex/_generated/dataModel'
import { ChangeSetFromJson } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionFromSerialized } from '~/lib/codemirror/editor-selection-schema'
import { TextFromStringArray } from '~/lib/codemirror/text-schema'
import { AssetBase, assetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const assetText = v.object({
  ...assetBase.fields,
  type: v.literal('text'),
  value: v.array(v.string()),
  changes: v.array(v.any()),
})

export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  type: Schema.Literal('text'),
  value: TextFromStringArray,
  changes: Schema.Array(
    Schema.Tuple(
      /**
       * The offset
       */
      Schema.Number,
      /**
       * @see https://codemirror.net/docs/ref/#state.TransactionSpec
       */
      Schema.Tuple(ChangeSetFromJson, EditorSelectionFromSerialized),
    ),
  ),
}) {
  static encodedFromEntity({
    type,
    value,
    changes,
    ...base
  }: Infer<typeof assetText> & {
    _id: Id<'assets'>
  }): typeof AssetText.Encoded {
    return {
      ...AssetBase.encodedFromEntity(base),
      type,
      value,
      changes,
    }
  }
}

export type AssetTextChange = (typeof AssetText.Type)['changes'][number]

export const reversedTextChanges = (
  initialValue: Text,
  advances: ReadonlyArray<AssetTextChange>,
): ReadonlyArray<AssetTextChange> => {
  let currentValue = initialValue
  const reverses: Array<AssetTextChange> = []

  for (const [offset, [changeSet, selection]] of advances) {
    const invertedChangeSet = changeSet.invert(currentValue)
    currentValue = changeSet.apply(currentValue)
    reverses.unshift([offset, [invertedChangeSet, selection]])
  }

  return reverses
}

export const seekCodeMirrorChanges =
  (state: EditorState) =>
  (initialValue: Text) =>
  (
    advances: ReadonlyArray<AssetTextChange>,
    reverses: ReadonlyArray<AssetTextChange>,
  ) =>
  (anchor: number | undefined, head: number | undefined): TransactionSpec => {
    if (!head) {
      return {
        changes: {
          from: 0,
          to: state.doc.length,
          insert: initialValue,
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
        applyChange(advances[i]!)
      }
    } else if (anchor > head) {
      for (let i = anchor; i > head; i--) {
        applyChange(reverses[i]!)
      }
    }

    return {
      changes,
      selection,
      scrollIntoView: true,
      sequential: true,
    }
  }
