import type { ClassValue } from 'clsx'
import { composeRenderProps } from 'react-aria-components'
import { cx } from './cx'

export const composeTailwindRenderProps = <T>(
  className: string | ((v: T) => string) | undefined,
  ...inputs: Array<ClassValue>
) => composeRenderProps(className, (cs) => cx(...inputs, cs))

export { composeTailwindRenderProps as ctr }
