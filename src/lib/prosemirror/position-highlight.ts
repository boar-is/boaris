import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { type Editor, Extension } from '@tiptap/react'
import { findBlockAncestorDepth } from '~/lib/prosemirror/find-block-ancestor-depth'

const name = 'PositionHighlight'

type State = number

const key = new PluginKey<State>(name)

export const PositionHighlight = Extension.create({
  name,
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key,
        state: {
          init: (): State => 0,
          apply: (tr, oldPosition) => {
            const newPosition = tr.getMeta(key)
            return typeof newPosition === 'number' ? newPosition : oldPosition
          },
        },
        props: {
          decorations(state) {
            const position = key.getState(state)!

            const $pos = state.doc.resolve(position)
            const depth = findBlockAncestorDepth($pos)

            if (depth === undefined) {
              return DecorationSet.empty
            }

            const blockNode = $pos.node(depth)
            const blockStart = $pos.start(depth)

            const decorations: Array<Decoration> = []
            blockNode.descendants((node, localPos) => {
              if (!node.isText || !node.text?.length) {
                return
              }

              for (let i = 0; i < node.text.length; i++) {
                const charPos = blockStart + localPos + i + 1

                decorations.push(
                  Decoration.inline(charPos - 1, charPos, {
                    nodeName: 'span',
                    class: charPos - 1 < position ? 'h' : '',
                  }),
                )
              }
            })

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
