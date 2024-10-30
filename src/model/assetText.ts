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
      Schema.Tuple(
        ChangeSetFromJson,
        Schema.UndefinedOr(EditorSelectionFromSerialized),
      ),
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
  const reverses: Array<AssetTextChange> = []
  let currentValue = initialValue

  for (let i = 0; i < advances.length; i++) {
    const [offset, [changeSet]] = advances[i]!
    const invertedChangeSet = changeSet.invert(currentValue)

    const selection = i > 0 ? advances[i - 1]![1][1] : undefined
    reverses.push([offset, [invertedChangeSet, selection]])
    currentValue = changeSet.apply(currentValue)
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
    if (head === undefined) {
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

    if (anchor === undefined || anchor < head) {
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
