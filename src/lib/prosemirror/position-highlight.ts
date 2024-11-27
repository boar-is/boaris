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

            // Resolve the position to find the block node
            let $pos = state.doc.resolve(position)
            while ($pos.depth > 0 && !$pos.node($pos.depth).isBlock) {
              $pos = state.doc.resolve($pos.before($pos.depth))
            }
            const blockStart = $pos.start($pos.depth)
            const blockEnd = $pos.end($pos.depth)

            // Create a decoration from the block start to the target position
            const decorations = []
            if (blockStart <= position && position <= blockEnd) {
              decorations.push(
                Decoration.inline(blockStart, position, {
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
