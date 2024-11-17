import { Schema } from 'effect'

export class AssetBase extends Schema.Class<AssetBase>('AssetBase')({
  _id: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
}) {}
