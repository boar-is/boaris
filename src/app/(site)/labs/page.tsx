'use client'

import { Button } from '~/lib/buttons/button'

export default function LabsPage() {
  return (
    <div className="container flex gap-4 items-start">
      <Button size="xs">Extra</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
