import { ChangeSet, EditorSelection } from '@uiw/react-codemirror'
import { expect, it } from 'vitest'
import {
  compressedToTrackChange,
  decompressedFromTrackChange,
} from '~/model3/trackTextChange'

it('should properly compress/decompress', () => {
  const changeSet = ChangeSet.of({ from: 1, to: 5, insert: 'hello' }, 12)
  const editorSelection = EditorSelection.create([
    EditorSelection.range(1, 3),
    EditorSelection.range(4, 6),
    EditorSelection.range(8, 12),
  ])

  const [changeSet2, editorSelection2] = decompressedFromTrackChange(
    compressedToTrackChange(changeSet, editorSelection),
  )

  expect(changeSet.toJSON()).toEqual(changeSet2.toJSON())
  expect(editorSelection.eq(editorSelection2)).toBeTruthy()
})
