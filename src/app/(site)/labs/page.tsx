'use client'

import { Button } from '~/lib/buttons/button'

export default function LabsPage() {
  return (
    <div className="container space-x-4">
      <Button intent="primary">Primary</Button>
      <Button intent="secondary">Secondary</Button>
      <Button intent="tertiary">Tertiary</Button>
    </div>
  )
}
