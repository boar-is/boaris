import { cx } from '~/lib/react/cx'

export const shadowInsetStyles = cx(
  'relative after:content-[""] after:absolute after:-inset-px after:-z-10 after:shadow-inset',
)
