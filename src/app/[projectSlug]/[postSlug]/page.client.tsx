'use client'

import { Memo } from '@legendapp/state/react'
import { useRef } from 'react'
import { useWorkspaceProjectPostContext } from './context'

export function WorkspaceProjectClientPage() {
  const renderCount = ++useRef(0).current

  return (
    <div>
      <div>renderCount: {renderCount}</div>
      <div>
        comp1: <Comp1 />
      </div>
      <div>
        comp2: <Comp2 />
      </div>
    </div>
  )
}

function Comp1() {
  const renderCount = ++useRef(0).current

  const context$ = useWorkspaceProjectPostContext()
  return (
    <div>
      <div>renderCount: {renderCount}</div>
      <div>
        <input
          type="text"
          value={context$.post.title.get()}
          onChange={(e) => context$.post.title.set(e.target.value)}
        />
      </div>
    </div>
  )
}

function Comp2() {
  const renderCount = ++useRef(0).current

  const context$ = useWorkspaceProjectPostContext()
  return (
    <div>
      <div>renderCount: {renderCount}</div>
      <div>
        <Memo>{context$.post.title}</Memo>
      </div>
    </div>
  )
}
