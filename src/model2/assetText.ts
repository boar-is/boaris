import type { ChangeSet, EditorSelection, Text } from '@uiw/react-codemirror'
import type { AssetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type AssetText = AssetBase & {
  type: 'text'
  value: Text

  changes: Array<
    [
      offset: number,
      /**
       * @see https://codemirror.net/docs/ref/#state.TransactionSpec
       */
      spec: [ChangeSet, EditorSelection?],
    ]
  >
}
