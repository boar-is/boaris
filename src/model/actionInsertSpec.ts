import { ChangeSet } from '@uiw/react-codemirror'
import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const actionInsertSpec = v.object({
  from: v.number(),
  to: v.optional(v.number()),
  value: v.optional(v.string()),
  length: v.number(),
})

export class ActionInsertSpec extends Schema.Class<ActionInsertSpec>(
  'ActionInsertSpec',
)({
  from: Schema.Number,
  to: Schema.UndefinedOr(Schema.Number),
  value: Schema.UndefinedOr(Schema.String),
  length: Schema.Number,
}) {
  static encodedFromEntity({
    from,
    to,
    value,
    length,
  }: Infer<typeof actionInsertSpec>): typeof ActionInsertSpec.Encoded {
    return {
      from,
      to,
      value,
      length,
    }
  }
}

export const changeSetFromActionInsertSpec = ({
  length,
  ...spec
}: typeof ActionInsertSpec.Type) =>
  // @ts-expect-error exactOptionalPropertyTypes issue for CodeMirror
  ChangeSet.of(spec, length)
