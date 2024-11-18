import { composeRenderProps } from 'react-aria-components'
import { cx } from './cx'

export const composeTailwindRenderProps = <T>(
  className: string | ((v: T) => string) | undefined,
  tw: string | Array<string | undefined>,
) => composeRenderProps(className, (cs) => cx(tw, cs))

export { composeTailwindRenderProps as ctr }
