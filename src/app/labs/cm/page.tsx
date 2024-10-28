'use client'

import ReactCodeMirror, {
  type ReactCodeMirrorRef,
  type ViewUpdate,
} from '@uiw/react-codemirror'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'

const CodeMirror = memo(ReactCodeMirror)

export default function Page() {
  const ref = useRef<ReactCodeMirrorRef>(null)

  const [actions, setActions] = useState([])

  const extensions = useMemo(() => [], [])
  const onChange = useCallback((viewUpdate: ViewUpdate) => {
    console.log(viewUpdate)
  }, [])

  return (
    <div>
      <CodeMirror
        value={`const greeting = 'Hello, World!'`}
        theme={codemirrorTheme}
        extensions={extensions}
        onUpdate={onChange}
        ref={ref}
      />
    </div>
  )
}
