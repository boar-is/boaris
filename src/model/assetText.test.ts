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

describe.concurrent('seekCodeMirrorChanges', () => {
  type Params = {
    initialValue: Text
    advances: ReadonlyArray<AssetTextChange>
  }

  const params1: Params = {
    initialValue: Text.of(['0123456789']),
    advances: [
      [
        1,
        [ChangeSet.of({ from: 0, insert: 'a' }, 10), EditorSelection.single(0)],
      ],
    ],
  }

  it.concurrent.each<{
    params: Params & {
      currentValue: Text
      head: number | undefined
      anchor: number | undefined
    }
    expects: {
      doc: Text
      selection: EditorSelection | undefined
      scrollIntoView: boolean
    }
  }>([
    {
      params: {
        ...params1,
        currentValue: params1.initialValue,
        head: undefined,
        anchor: 0,
      },
      expects: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(0),
        scrollIntoView: true,
      },
    },
  ])(
    '$params -> $returns',
    ({
      params: { initialValue, currentValue, advances, head, anchor },
      expects,
    }) => {
      const currentState = EditorState.create({ doc: currentValue })
      const spec = seekCodeMirrorChanges(currentState)(initialValue)(
        advances,
        reversedTextChanges(initialValue, advances),
      )(head, anchor)

      const transaction = currentState.update(spec)

      expect(transaction.newDoc.eq(expects.doc)).toBeTruthy()

      {
        const a = transaction.selection
        const b = expects.selection
        expect((!a && !b) || (a && b && a.eq(b))).toBeTruthy()
      }

      expect(transaction.scrollIntoView).toEqual(expects.scrollIntoView)
    },
  )
})
