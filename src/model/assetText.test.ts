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
  const doc = Text.of(['0123456789'])
  const advances = [
    [
      1,
      [ChangeSet.of({ from: 0, insert: 'a' }, 10), EditorSelection.single(0)],
    ],
  ] as const satisfies ReadonlyArray<AssetTextChange>

  it.concurrent.each<{
    params: {
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
        head: undefined,
        anchor: 0,
      },
      expects: {
        doc: Text.of(['a0123456789']),
        selection: EditorSelection.single(0),
        scrollIntoView: true,
      },
    },
  ])('$params -> $returns', ({ params: { head, anchor }, expects }) => {
    const state = EditorState.create({ doc })
    const reverses = reversedTextChanges(doc, advances)

    const spec = seekCodeMirrorChanges(state)(doc)(advances, reverses)(
      head,
      anchor,
    )
    const transaction = state.update(spec)

    expect(transaction.newDoc.eq(expects.doc)).toBeTruthy()

    {
      const a = transaction.selection
      const b = expects.selection
      expect((!a && !b) || (a && b && a.eq(b))).toBeTruthy()
    }

    expect(transaction.scrollIntoView).toEqual(expects.scrollIntoView)
  })
})
