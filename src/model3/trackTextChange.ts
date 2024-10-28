import { ChangeSet, EditorSelection } from '@uiw/react-codemirror'
import { Schema } from 'effect'

/**
 * @see https://codemirror.net/docs/ref/#state.TransactionSpec
 */
export const TrackTextChange = Schema.Tuple(
  /**
   * Type of the change
   */
  Schema.Literal(0),
  /**
   * @see https://codemirror.net/docs/ref/#state.ChangeSet.toJSON
   */
  Schema.Any,
  /**
   * Custom serialization of EditorSelection
   * @see https://codemirror.net/docs/ref/#state.EditorSelection
   */
  Schema.Tuple(
    /**
     * @see https://codemirror.net/docs/ref/#state.EditorSelection.ranges
     */
    /**
     * @see https://codemirror.net/docs/ref/#state.EditorSelection.mainIndex
     */
    Schema.Array(
      Schema.Tuple(Schema.Number, Schema.optionalElement(Schema.Number)),
    ),
    Schema.optionalElement(Schema.Number),
  ),
)

export const compressedToTrackChange = (
  changeSet: ChangeSet,
  { ranges, mainIndex }: EditorSelection,
): typeof TrackTextChange.Type => [
  0,
  changeSet.toJSON(),
  [ranges.map((it) => [it.from, it.to]), mainIndex],
]

export const decompressedFromTrackChange = ([
  type,
  changeSet,
  [ranges, mainIndex],
]: typeof TrackTextChange.Type): [ChangeSet, EditorSelection] => {
  if (type !== 0) {
    throw new Error(`Unknown change type ${type}`)
  }

  return [
    ChangeSet.fromJSON(changeSet),
    EditorSelection.create(
      ranges.map(([anchor, head]) =>
        EditorSelection.range(anchor, head ?? anchor),
      ),
      mainIndex,
    ),
  ]
}
