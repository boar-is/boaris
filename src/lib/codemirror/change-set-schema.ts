import { ChangeSet } from '@uiw/react-codemirror'
import { Schema } from 'effect'

export const ChangeSetSchema = Schema.declare(
  (input: unknown): input is ChangeSet => input instanceof ChangeSet,
  {
    identifier: 'ChangeSetSchema',
    decode: (input: ChangeSet) => input.toJSON(),
    encode: (input: unknown) => ChangeSet.fromJSON(input),
  },
)
