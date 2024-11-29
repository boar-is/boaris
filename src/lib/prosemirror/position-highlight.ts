import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { type Editor, Extension } from '@tiptap/react'
import { findBlockAncestorDepth } from '~/lib/prosemirror/find-block-ancestor-depth'

const name = 'PositionHighlight'

type State = {
  position: number
  wrapDecorationSet: DecorationSet
  highlightDecorationSet: DecorationSet
}

const key = new PluginKey<State>(name)

export const PositionHighlight = Extension.create({
  name,
  addProseMirrorPlugins: () => [
    new Plugin({
      key,
      state: {
        init: (_, { doc }): State => {
          const wrapDecorations: Array<Decoration> = []

          doc.descendants((node, pos) => {
            if (!node.isText || !node.text?.length) {
              return
            }

            for (let i = 0; i < node.text.length; i++) {
              wrapDecorations.push(
                Decoration.inline(pos + i, pos + i + 1, {
                  nodeName: 'span',
                }),
              )
            }
          })

          return {
            position: 0,
            wrapDecorationSet: DecorationSet.create(doc, wrapDecorations),
            highlightDecorationSet: DecorationSet.empty,
          }
        },
        apply: (tr, state): State => {
          const position = tr.getMeta(key)

          if (typeof position !== 'number') {
            return state
          }

          const $pos = tr.doc.resolve(position)
          const depth = findBlockAncestorDepth($pos)

          if (depth === undefined) {
            return state
          }

          const blockNode = $pos.node(depth)
          const blockStart = $pos.start(depth)

          const highlightDecorations: Array<Decoration> = []
          blockNode.descendants((node, localPos) => {
            if (!node.isText || !node.text?.length) {
              return
            }

            for (let i = 0; i < node.text.length; i++) {
              const charPos = blockStart + localPos + i + 1

              if (charPos - 1 < position) {
                highlightDecorations.push(
                  Decoration.inline(charPos - 1, charPos, {
                    class: 'h',
                  }),
                )
              }
            }
          })

          return {
            position,
            wrapDecorationSet: tr.docChanged
              ? state.wrapDecorationSet.map(tr.mapping, tr.doc)
              : state.wrapDecorationSet,
            highlightDecorationSet: DecorationSet.create(
              tr.doc,
              highlightDecorations,
            ),
          }
        },
      },
      props: {
        decorations: (state) => {
          const { wrapDecorationSet, highlightDecorationSet } =
            key.getState(state)!

          return DecorationSet.create(state.doc, [
            ...wrapDecorationSet.find(),
            ...highlightDecorationSet.find(),
          ])
        },
      },
    }),
  ],
})

export const setHighlightPosition = (editor: Editor) => (position: number) => {
  const tr = editor.state.tr.setMeta(key, position)

  editor.view.dispatch(tr)
  return true
}
