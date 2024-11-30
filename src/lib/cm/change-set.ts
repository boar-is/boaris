import { ChangeSet } from '@uiw/react-codemirror'
import { ParseResult, Schema } from 'effect'

export const ChangeSetFromSelf = Schema.declare(
  (input: unknown): input is ChangeSet => input instanceof ChangeSet,
  {
    identifier: 'ChangeSetFromSelf',
    description: 'https://codemirror.net/docs/ref/#state.ChangeSet',
  },
)

export const ChangeSetFromJson = Schema.transformOrFail(
  Schema.Any,
  ChangeSetFromSelf,
  {
    strict: true,
    decode: (input, _, ast) => {
      try {
        return ParseResult.succeed(ChangeSet.fromJSON(input))
      } catch (e) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            input,
            `Failed to convert JSON to ChangeSet: ${e}`,
          ),
        )
      }
    },
    encode: (input) => ParseResult.succeed(input.toJSON()),
  },
)
