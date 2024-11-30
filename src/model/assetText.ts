import { Schema } from 'effect'
import { OffsetChange } from '~/lib/cm/offset-change'
import { TextFromStringArray } from '~/lib/cm/text'
import { AssetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  type: Schema.Literal('text'),
  initialValue: TextFromStringArray,
  advances: Schema.Array(OffsetChange),
}) {}
