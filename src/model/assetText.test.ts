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
  type Scenario = {
    params: {
      initialValue: Text
      advances: ReadonlyArray<AssetTextChange>
    }
    states: Record<
      'undefined' | number,
      {
        doc: Text
        selection: EditorSelection | undefined
        scrollIntoView: boolean
      }
    >
  }

  const scenario1: Scenario = {
    params: {
      initialValue: Text.of(['0123456789']),
      advances: [
        [
          0.1,
          [
            ChangeSet.of({ from: 0, insert: 'a' }, 10),
            EditorSelection.single(0),
          ],
        ],
        [0.2, [ChangeSet.empty(11), EditorSelection.single(5)]],
        [
          0.3,
          [ChangeSet.of({ from: 3, to: 5 }, 11), EditorSelection.single(2)],
        ],
        [
          0.4,
          [
            ChangeSet.of({ from: 4, to: 6, insert: '!' }, 9),
            EditorSelection.single(1),
          ],
        ],
        [0.5, [ChangeSet.empty(8), EditorSelection.single(8)]],
      ],
    },
    states: {
      undefined: {
        doc: Text.of(['0123456789']),
        selection: undefined,
        scrollIntoView: true,
      },
      0: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(0),
        scrollIntoView: true,
      },
      1: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(5),
        scrollIntoView: true,
      },
      2: {
        doc: Text.of(['a01456789']),
        selection: EditorSelection.single(2),
        scrollIntoView: true,
      },
      3: {
        doc: Text.of(['a014!789']),
        selection: EditorSelection.single(1),
        scrollIntoView: true,
      },
      4: {
        doc: Text.of(['a014!789']),
        selection: EditorSelection.single(8),
        scrollIntoView: true,
      },
    },
  }

  it.each<
    [anchor: number | undefined, head: number | undefined, scenario: Scenario]
  >([
    [undefined, undefined, scenario1],
    [undefined, 0, scenario1],
    [undefined, 1, scenario1],
    [undefined, 2, scenario1],
    [undefined, 3, scenario1],
    [undefined, 4, scenario1],
    [4, 3, scenario1],
    [4, 2, scenario1],
  ])(
    '%i -> %i',
    (head, anchor, { params: { initialValue, advances }, states }) => {
      const anchorState = states[anchor ?? 'undefined']!
      const headState = states[head ?? 'undefined']!

      const currentState = EditorState.create({ doc: anchorState.doc })
      const reverses = reversedTextChanges(initialValue, advances)

      const spec = seekCodeMirrorChanges(currentState)(initialValue)(
        advances,
        reverses,
      )(anchor, head)

      const transaction = currentState.update(spec)

      expect(transaction.newDoc.toString()).toEqual(headState.doc.toString())

      {
        const actual = transaction.selection
        const expected = headState.selection
        expect(
          (!actual && !expected) || (actual && expected && actual.eq(expected)),
        ).toBeTruthy()
      }

      expect(transaction.scrollIntoView).toEqual(headState.scrollIntoView)
    },
  )
})
