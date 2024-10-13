'use client'

import { Memo, Show } from '@legendapp/state/react'
import { useWorkspaceProjectPostContext } from '../context'

export function PostLayout() {
  const state$ = useWorkspaceProjectPostContext()

  return (
    <Show if={state$.layout} else={null}>
      <div className="fixed bottom-0 inset-x-0 bg-gray-1 rounded-t-lg">
        !{<Memo>{() => JSON.stringify(state$.layout.get(), null, 2)}</Memo>}@
      </div>
    </Show>
  )
}
