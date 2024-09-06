import { history } from '@tiptap/pm/history'
import { ResolvedPos, Schema } from '@tiptap/pm/model'
import { Node } from '@tiptap/pm/model'
import { schema } from '@tiptap/pm/schema-basic'
import { EditorState, TextSelection } from '@tiptap/pm/state'
import { expect, it } from 'vitest'

const postSchema = new Schema({
  nodes: {
    doc: {
      content: 'track*',
    },
    track: {
      content: 'clip*',
    },
    clip: {
      atom: true,
    },
    text: {},
  },
})

it('should test', () => {
  const state = EditorState.create({
    plugins: [history()],
    doc: postSchema.node('doc', null, [
      postSchema.node('track', null, [
        postSchema.node('clip', null),
        postSchema.node('clip', null),
        postSchema.node('clip', null),
      ]),
      postSchema.node('track', null, [postSchema.node('clip', null)]),
    ]),
  })
})
