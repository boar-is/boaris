import type { Text } from '@uiw/react-codemirror'
import type { OffsetChange } from '~/lib/codemirror/offset-change'
import type { AssetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export type AssetText = AssetBase & {
  type: 'text'
  initialValue: Text
  advances: Array<OffsetChange>
}
