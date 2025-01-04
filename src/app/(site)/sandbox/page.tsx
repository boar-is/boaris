import { mono } from '~/lib/media/fonts/mono'
import { cx } from '~/lib/react/cx'
import { SandboxText } from './_text'

export default function SandboxPage() {
  return (
    <div className={cx(mono.variable)}>
      <SandboxText />
    </div>
  )
}
