import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ActionBase, actionBase } from './actionBase'
import { ActionInsertSpec, actionInsertSpec } from './actionInsertSpec'

export const actionInsert = v.object({
  ...actionBase.fields,
  type: v.literal('insert'),
  forwardSpec: actionInsertSpec,
  backwardSpec: actionInsertSpec,
})

export class ActionInsert extends ActionBase.extend<ActionInsert>(
  'ActionInsert',
)({
  type: Schema.Literal('insert'),
  forwardSpec: ActionInsertSpec,
  backwardSpec: ActionInsertSpec,
}) {
  static encodedFromEntity({
    type,
    forwardSpec,
    backwardSpec,
    ...base
  }: Infer<typeof actionInsert>): typeof ActionInsert.Encoded {
    return {
      ...ActionBase.encodedFromEntity(base),
      type,
      forwardSpec: ActionInsertSpec.encodedFromEntity(forwardSpec),
      backwardSpec: ActionInsertSpec.encodedFromEntity(backwardSpec),
    }
  }
}
