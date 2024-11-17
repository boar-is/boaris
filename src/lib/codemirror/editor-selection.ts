import { EditorSelection } from '@uiw/react-codemirror'
import { ParseResult, Schema } from 'effect'

export const EditorSelectionFromSelf = Schema.declare(
  (input: unknown): input is EditorSelection =>
    input instanceof EditorSelection,
  {
    identifier: 'EditorSelectionFromSelf',
    description: 'https://codemirror.net/docs/ref/#state.EditorSelection',
  },
)

export const EditorSelectionFromSerialized = Schema.transformOrFail(
  Schema.Any,
  EditorSelectionFromSelf,
  {
    strict: true,
    decode: (input, _, ast) => {
      try {
        return ParseResult.succeed(
          EditorSelection.create(
            input[0].map(([anchor, head]: [number, number]) =>
              EditorSelection.range(anchor, head ?? anchor),
            ),
            input[1] ?? 0,
          ),
        )
      } catch (e) {
        return ParseResult.fail(
          new ParseResult.Type(
            ast,
            input,
            `Failed to convert EditorSelection: ${e}`,
          ),
        )
      }
    },
    encode: ({ ranges, mainIndex }) =>
      ParseResult.succeed([
        ranges.map(({ anchor, head }) => [
          anchor,
          head === anchor ? undefined : head,
        ]),
        mainIndex === 0 ? undefined : mainIndex,
      ]),
  },
)
