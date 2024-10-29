import {
  ChangeSet,
  EditorState,
  Text,
  type TransactionSpec,
} from '@uiw/react-codemirror'
import { describe, expect, it } from 'vitest'
import {
  type AssetTextChange,
  reversedTextChanges,
  seekCodeMirrorChanges,
} from '~/model/assetText'

describe.concurrent('seekCodeMirrorChanges', () => {
  it.concurrent.each<{
    params: {
      doc: Text
      advances: ReadonlyArray<AssetTextChange>
      head: number
      anchor: number
    }
    returns: TransactionSpec
  }>([
    {
      params: {
        doc: Text.of(['abc']),
        advances: [],
        head: 0,
        anchor: 0,
      },
      returns: {
        changes: ChangeSet.empty(3),
        scrollIntoView: true,
        selection: undefined,
        sequential: true,
      },
    },
  ])(
    '$params -> $returns',
    ({ params: { doc, advances, head, anchor }, returns }) => {
      const state = EditorState.create({ doc })
      const reverses = reversedTextChanges(doc, advances)

      expect(
        seekCodeMirrorChanges(state)(doc)(advances, reverses)(head, anchor),
      ).toEqual(returns)
    },
  )
})
