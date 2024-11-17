import { Schema } from 'effect'
import { ChangeSetFromJson } from './change-set'
import { EditorSelectionFromSerialized } from './editor-selection'

export const OffsetChange = Schema.Tuple(
  /**
   * The offset
   */
  Schema.Int,
  /**
   * @see https://codemirror.net/docs/ref/#state.TransactionSpec
   */
  Schema.Tuple(
    ChangeSetFromJson,
    Schema.UndefinedOr(EditorSelectionFromSerialized),
  ),
)
