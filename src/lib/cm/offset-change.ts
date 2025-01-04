import { Schema } from 'effect'
import { transform } from 'motion'
import { ChangeSetFromJson } from './change-set'
import { EditorSelectionFromSerialized } from './editor-selection'

export const OffsetChange = Schema.Tuple(
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
)

export const createOffsetChangesShifter = () => {
  const decode = Schema.decodeSync(OffsetChange)
  return (changes: ReadonlyArray<typeof OffsetChange.Encoded>) => {
    const maxOffset = changes[changes.length - 1]?.[0] ?? 0
    return (from = 0, to = 1) =>
      changes.map(([offset, tuple]) =>
        decode([transform(offset, [0, maxOffset], [from, to]), tuple]),
      )
  }
}
