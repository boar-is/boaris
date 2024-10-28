import { EditorSelection } from '@uiw/react-codemirror'
import { Schema } from 'effect'

export const EditorSelectionSchema = Schema.declare(
  (input: unknown): input is EditorSelection =>
    input instanceof EditorSelection,
  {
    identifier: 'EditorSelectionSchema',
    decode: ({ ranges, mainIndex }: EditorSelection) => [
      ranges.map(({ anchor, head }) => [
        anchor,
        head === anchor ? undefined : head,
      ]),
      mainIndex === 0 ? undefined : mainIndex,
    ],
    // biome-ignore lint/suspicious/noExplicitAny: yolo
    encode: ([ranges, mainIndex]: any) =>
      EditorSelection.create(
        // @ts-expect-error yolo
        ranges.map(([anchor, head]) =>
          EditorSelection.range(anchor, head ?? anchor),
        ),
        mainIndex ?? 0,
      ),
  },
)
