import {
  ChangeSet,
  EditorSelection,
  EditorState,
  Text,
} from '@uiw/react-codemirror'
import { describe, expect, it } from 'vitest'
import {
  type AssetTextChange,
  reversedTextChanges,
  seekCodeMirrorChanges,
} from '~/model/assetText'

describe('seekCodeMirrorChanges', () => {
  type Params = {
    initialValue: Text
    advances: ReadonlyArray<AssetTextChange>
  }

  const params1: Params = {
    initialValue: Text.of(['0123456789']),
    advances: [
      [
        0.1,
        [ChangeSet.of({ from: 0, insert: 'a' }, 10), EditorSelection.single(0)],
      ],
      [0.2, [ChangeSet.empty(11), EditorSelection.single(5)]],
      [0.3, [ChangeSet.of({ from: 3, to: 5 }, 11), EditorSelection.single(2)]],
      [
        0.4,
        [
          ChangeSet.of({ from: 4, to: 6, insert: '!' }, 9),
          EditorSelection.single(1),
        ],
      ],
      [0.5, [ChangeSet.empty(8), EditorSelection.single(8)]],
    ],
  }

  it.each<
    Params & {
      currentValue: Text
      head?: number | undefined
      anchor?: number | undefined
      expects: {
        doc: Text
        selection?: EditorSelection | undefined
        scrollIntoView: boolean
      }
    }
  >([
    {
      ...params1,
      currentValue: params1.initialValue,
      expects: {
        doc: Text.of(['0123456789']),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: params1.initialValue,
      head: 0,
      expects: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(0),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: params1.initialValue,
      head: 1,
      expects: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(5),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: params1.initialValue,
      head: 2,
      expects: {
        doc: Text.of(['a01456789']),
        selection: EditorSelection.single(2),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: params1.initialValue,
      head: 3,
      expects: {
        doc: Text.of(['a014!789']),
        selection: EditorSelection.single(1),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: params1.initialValue,
      head: 4,
      expects: {
        doc: Text.of(['a014!789']),
        selection: EditorSelection.single(8),
        scrollIntoView: true,
      },
    },
    {
      ...params1,
      currentValue: Text.of(['a014!789']),
      anchor: 4,
      head: 3,
      expects: {
        doc: Text.of(['a014!789']),
        selection: EditorSelection.single(1),
        scrollIntoView: true,
      },
    },
  ])(
    '$anchor -> $head',
    ({ initialValue, currentValue, advances, head, anchor, expects }) => {
      const currentState = EditorState.create({ doc: currentValue })
      const reverses = reversedTextChanges(initialValue, advances)

      const spec = seekCodeMirrorChanges(currentState)(initialValue)(
        advances,
        reverses,
      )(anchor, head)

      const transaction = currentState.update(spec)

      expect(transaction.newDoc.toString()).toEqual(expects.doc.toString())

      {
        const actual = transaction.selection
        const expected = expects.selection
        expect(
          (!actual && !expected) || (actual && expected && actual.eq(expected)),
        ).toBeTruthy()
      }

      expect(transaction.scrollIntoView).toEqual(expects.scrollIntoView)
    },
  )
})
