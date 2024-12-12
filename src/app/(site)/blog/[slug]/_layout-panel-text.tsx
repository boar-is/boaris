import ReactCodeMirror, {
  type BasicSetupOptions,
  EditorState,
  type ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import { Option } from 'effect'
import { useStore } from 'jotai/index'
import { memo, useEffect, useMemo, useRef } from 'react'
import { codemirrorTheme } from '~/lib/cm/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/cm/match-codemirror-extensions'
import { reversedChanges } from '~/lib/cm/reversed-changes'
import { seekChanges } from '~/lib/cm/seek-changes'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import type { AssetText } from '~/model/assetText'
import { usePostContent } from './_content'
import { PostLayoutPanelHeader } from './_layout-panel'

const basicCmSetup: BasicSetupOptions = {
  lineNumbers: false,
  foldGutter: false,
  highlightActiveLine: false,
}

export const PostLayoutPanelText = memo(function PostLayoutPanelText({
  asset: { name, initialValue, advances },
}: { asset: AssetText }) {
  const cmRef = useRef<ReactCodeMirrorRef>(null)

  const extensions = useMemo(() => matchCodemirrorExtensions(name), [name])

  const { progress$ } = usePostContent()

  const reverses = useMemo(
    () => reversedChanges(initialValue, advances),
    [initialValue, advances],
  )

  const anchorIndex$ = useConstAtom<number | undefined>(undefined)
  const headIndex$ = useConstAtom((get) =>
    findClosestIndex(advances, get(progress$), (it) => it[0]).pipe(
      Option.getOrUndefined,
    ),
  )

  const store = useStore()

  useEffect(
    () =>
      store.sub(headIndex$, () => {
        const view = cmRef.current?.view

        if (!view) {
          return
        }

        const anchor = store.get(anchorIndex$)
        const head = store.get(headIndex$)

        const spec = seekChanges({
          currentValue: view.state.doc,
          initialValue,
          advances,
          reverses,
          anchor,
          head,
        })

        try {
          view.dispatch(spec)
          store.set(anchorIndex$, head)
        } catch (error) {}
      }),
    [store, anchorIndex$, headIndex$, initialValue, advances, reverses],
  )

  const value = useMemo(() => {
    const state = EditorState.create({ doc: initialValue, extensions })
    const head = store.get(headIndex$)
    const spec = seekChanges({
      currentValue: state.doc,
      initialValue,
      advances,
      reverses,
      anchor: store.get(anchorIndex$),
      head,
    })
    store.set(anchorIndex$, head)
    return state.update(spec).newDoc.toString()
  }, [
    store,
    anchorIndex$,
    headIndex$,
    initialValue,
    advances,
    reverses,
    extensions,
  ])

  return (
    <>
      <PostLayoutPanelHeader name={name} />
      <ReactCodeMirror
        className="flex-1 h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!~text-sm/base [&_.cm-line]:px-4 [&_.cm-scroller]:overflow-hidden"
        value={value}
        extensions={extensions}
        editable={false}
        theme={codemirrorTheme}
        basicSetup={basicCmSetup}
        ref={cmRef}
      />
    </>
  )
})
