import { Node, mergeAttributes, textblockTypeInputRule } from '@tiptap/react'
import * as M from 'effect/Match'

type Level = (typeof levels)[number]
export type Offset = 0 | 1 | 2

export type HeadingOptions = {
  offset: Offset
  HTMLAttributes: Record<Level, Record<string, unknown>>
}

declare module '@tiptap/react' {
  // noinspection JSUnusedGlobalSymbols
  interface Commands<ReturnType> {
    heading: {
      setHeading: (attributes: { level: number }) => ReturnType
      toggleHeading: (attributes: { level: number }) => ReturnType
    }
  }
}

const levels = [0, 1] as const
const isLevel = (level: number): level is Level => levels.includes(level)

const matchLevelToSlot = (level: Level) =>
  M.value(level).pipe(
    M.when(0, () => 'heading'),
    M.when(1, () => 'subheading'),
    M.exhaustive,
  )

export const Heading = Node.create<HeadingOptions>({
  name: 'heading',
  content: 'inline*',
  group: 'block',
  defining: true,
  addOptions() {
    return {
      offset: 0,
      HTMLAttributes: {
        0: {},
        1: {},
      } as const,
    } as const
  },
  addAttributes() {
    return {
      level: {
        default: 0,
        rendered: false,
      } as const,
    }
  },
  parseHTML() {
    const { offset } = this.options

    return levels.map((level) => ({
      tag: `h${level + offset + 1}`,
      attrs: { level: +level },
    }))
  },
  renderHTML({ node, HTMLAttributes }) {
    const { offset } = this.options
    const level = node.attrs['level']

    const attrs = isLevel(level) ? this.options.HTMLAttributes[level] : {}

    return [
      `h${level + offset + 1}`,
      mergeAttributes(
        {
          'data-slot': matchLevelToSlot(level),
        },
        attrs,
        HTMLAttributes,
      ),
      0,
    ]
  },
  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          if (!levels.includes(attributes.level)) {
            return false
          }

          return commands.setNode(this.name, attributes)
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          if (!levels.includes(attributes.level)) {
            return false
          }

          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
    }
  },
  addKeyboardShortcuts() {
    return levels.reduce(
      (items, level) => {
        items[`Mod-Alt-${level + 1}`] = () =>
          this.editor.commands.toggleHeading({
            level,
          })
        return items
      },
      {} as Record<string, () => boolean>,
    )
  },
  addInputRules() {
    return levels.map((level) =>
      textblockTypeInputRule({
        find: new RegExp(`^(#{1,${level + 1}})\\s$`),
        type: this.type,
        getAttributes: {
          level,
        },
      }),
    )
  },
})
