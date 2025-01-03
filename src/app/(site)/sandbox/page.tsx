import { mono } from '~/lib/media/fonts/mono'
import { cx } from '~/lib/react/cx'
import { SandboxCaptions } from './_captions'

export default function SandboxPage() {
  return (
    <div className={cx(mono.variable)}>
      <SandboxCaptions />
    </div>
  )
}
