'use client'

import { javascript } from '@codemirror/lang-javascript'
import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { useCallback, useMemo, useRef } from 'react'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'
import type { AssetText } from '~/model/assetText'

export default function LabsPage() {
  const ref = useRef<ReactCodeMirrorRef>(null)
  const startTime = useRef<number | undefined>(undefined)
  const changesRef = useRef<
    Array<(typeof AssetText.Encoded)['changes'][number]>
  >([])

  return (
    <div>
      <ReactCodeMirror
        value=""
        theme={codemirrorTheme}
        ref={ref}
        extensions={useMemo(
          () => [javascript({ jsx: true, typescript: true })],
          [],
        )}
        onUpdate={useCallback((update) => {
          if (startTime.current && (update.selectionSet || update.docChanged)) {
            changesRef.current.push([
              (Date.now() - startTime.current) / 10e3,
              [update.changes.toJSON(), update.state.selection.toJSON()],
            ])
          }
        }, [])}
      />
      <button
        type="button"
        onClick={() => {
          startTime.current = Date.now()
        }}
      >
        record
      </button>
      <br />
      <button type="button" onClick={() => console.log(changesRef.current)}>
        show
      </button>
    </div>
  )
}
