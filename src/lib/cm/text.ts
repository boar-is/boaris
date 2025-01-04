import { Text } from '@uiw/react-codemirror'
import { Schema } from 'effect'

export const TextFromSelf = Schema.declare(
  (input: unknown): input is Text => input instanceof Text,
  {
    identifier: 'TextFromSelf',
    description: 'https://codemirror.net/docs/ref/#state.Text',
  },
)

export const TextFromStringArray = Schema.transform(
  Schema.Array(Schema.String),
  TextFromSelf,
  {
    strict: true,
    decode: (input) => Text.of(input),
    encode: (text) => text.toJSON(),
  },
)

export const textFromTemplate = (template: string) =>
  Text.of(template.split('\n'))

export { Text }
