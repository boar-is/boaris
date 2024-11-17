import type { ChangeSet, EditorSelection } from '@uiw/react-codemirror'

export type OffsetChange = [
  offset: number,
  /**
   * @see https://codemirror.net/docs/ref/#state.TransactionSpec
   */
  spec: [ChangeSet, EditorSelection | undefined],
]
