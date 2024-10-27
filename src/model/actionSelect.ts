import { EditorSelection } from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ActionBase, actionBase } from './actionBase'

export const actionSelect = v.object({
  ...actionBase.fields,
  type: v.literal('select'),
  ranges: v.array(
    v.object({
      anchor: v.number(),
      head: v.number(),
    }),
  ),
  mainIndex: v.optional(v.number()),
})

export class ActionSelect extends ActionBase.extend<ActionSelect>(
  'ActionSelect',
)({
  type: Schema.Literal('select'),
  ranges: Schema.Array(
    Schema.Struct({
      anchor: Schema.Number,
      head: Schema.Number,
    }),
  ),
  mainIndex: Schema.UndefinedOr(Schema.Number),
}) {
  static encodedFromEntity({
    type,
    ranges,
    mainIndex,
    ...base
  }: Infer<typeof actionSelect>): typeof ActionSelect.Encoded {
    return {
      ...ActionBase.encodedFromEntity(base),
      type,
      ranges,
      mainIndex,
    }
  }
}

export const editorSelectionFromActionSelect = (
  action: typeof ActionSelect.Type,
) =>
  EditorSelection.create(
    action.ranges.map((it) => EditorSelection.range(it.anchor, it.head)),
    action.mainIndex,
  )
