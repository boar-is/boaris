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
    const min = changes[0]?.[0] ?? 0
    const max = changes[changes.length - 1]?.[0] ?? 0
    return (from = 0, to = from) =>
      changes.map(([offset, tuple]) =>
        decode([transform(offset, [min, max], [from, to]), tuple]),
      )
  }
}
