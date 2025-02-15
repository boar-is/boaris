import { redirect } from 'next/navigation'
import { mono } from '~/lib/media/fonts/mono'
import { cx } from '~/lib/react/cx'
import { SandboxText } from './_text'

export default function SandboxPage() {
  if (globalThis.process.env.NODE_ENV === 'production') {
    return redirect('/')
  }

  return (
    <div className={cx(mono.variable)}>
      <SandboxText />
    </div>
  )
}
