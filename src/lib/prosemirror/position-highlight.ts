import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { type Editor, Extension } from '@tiptap/react'

const name = 'PositionHighlight'

type State = {
  position: number
}

const key = new PluginKey<State>(name)

export const PositionHighlight = Extension.create({
  name,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key,
        state: {
          init: (): State => ({ position: 0 }),
          apply(tr, value) {
            const newPosition = tr.getMeta(key)
            return typeof newPosition === 'number'
              ? { position: newPosition }
              : value
          },
        },
        props: {
          decorations(state) {
            const { position } = key.getState(state)!

            const $pos = state.doc.resolve(position)
            let depth = $pos.depth
            let blockFound = false

            while (depth > 0) {
              const node = $pos.node(depth)
              if (node.isBlock) {
                blockFound = true
                break
              }
              depth--
            }

            // If no block node was found, do not apply any decoration
            if (!blockFound) {
              return DecorationSet.empty
            }

            const blockStart = $pos.start(depth)
            const blockEnd = $pos.end(depth)

            // Ensure position is within block boundaries
            const clampedTargetPos = Math.min(
              Math.max(position, blockStart),
              blockEnd,
            )

            // Create a decoration from the block start to the target position
            const decorations = []
            if (
              blockStart <= clampedTargetPos &&
              clampedTargetPos <= blockEnd
            ) {
              decorations.push(
                Decoration.inline(blockStart, clampedTargetPos, {
                  class: 'captions-active',
                }),
              )
            }

            return DecorationSet.create(state.doc, decorations)
          },
        },
      }),
    ]
  },
})

export const setHighlightPosition = (editor: Editor) => (position: number) => {
  const tr = editor.state.tr.setMeta(key, position)

  editor.view.dispatch(tr)
  return true
}
