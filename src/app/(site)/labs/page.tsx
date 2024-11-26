'use client'

import { useState } from 'react'

export default function LabsPage() {
  const [captionsHeight, setCaptionsHeight] = useState(0)
  const [layoutHeight, setLayoutHeight] = useState(0)

  return (
    <div className="container space-y-8">
      <div className="flex flex-col gap-4 max-w-sm">
        <input
          type="number"
          min={0}
          step={10}
          value={captionsHeight}
          onChange={(e) => setCaptionsHeight(+e.target.value)}
        />
        <input
          type="number"
          min={0}
          step={10}
          value={layoutHeight}
          onChange={(e) => setLayoutHeight(+e.target.value)}
        />
      </div>
      <div>
        <div className="border border-[white] border-dashed h-[400px] max-w-lg p-2 flex flex-col justify-center gap-2">
          <div className="border border-[skyblue] overflow-hidden">
            <div style={{ height: captionsHeight }} />
          </div>
          <div className="border border-[green] overflow-y-auto min-h-32 shrink-[9999]">
            <div style={{ height: layoutHeight }} />
          </div>
        </div>
      </div>
    </div>
  )
}
