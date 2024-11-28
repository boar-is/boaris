import { cx } from '~/lib/react/cx'

export const shadowInsetStyles = cx(
  'relative after:content-[""] after:absolute after:-inset-px after:shadow-[inset_0_1px_rgb(255_255_255/20%)] after:pointer-events-none',
)
