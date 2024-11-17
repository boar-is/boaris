import {
  ChangeSet,
  type EditorSelection,
  type Text,
  type TransactionSpec,
} from '@uiw/react-codemirror'
import type { OffsetChange } from './offset-change'

export const seekChanges = ({
  currentValue,
  initialValue,
  advances,
  reverses,
  anchor,
  head,
}: {
  currentValue: Text
  initialValue: Text
  advances: ReadonlyArray<OffsetChange>
  reverses: ReadonlyArray<OffsetChange>
  anchor: number | undefined
  head: number | undefined
}): TransactionSpec => {
  if (head === undefined) {
    return {
      changes: {
        from: 0,
        to: currentValue.length,
        insert: initialValue,
      },
      selection: undefined,
      scrollIntoView: true,
    }
  }

  let changes = ChangeSet.empty(currentValue.length)
  let selection: EditorSelection | undefined

  const applyChange = (change: OffsetChange) => {
    const [changeSet, editorSelection] = change[1]
    changes = changes.compose(changeSet)
    selection = editorSelection
  }

  if (anchor === undefined || anchor < head) {
    for (let i = anchor === undefined ? 0 : anchor + 1; i <= head; i++) {
      applyChange(advances[i]!)
    }
  } else if (anchor > head) {
    for (let i = anchor; i > head; i--) {
      applyChange(reverses[i]!)
    }
  }

  return {
    changes,
    selection,
    scrollIntoView: true,
    sequential: true,
  }
}
