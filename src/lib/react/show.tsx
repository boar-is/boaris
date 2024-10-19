import type { Observable, Selector } from '@legendapp/state'
import { isFunction, isObservableValueReady } from '@legendapp/state'
import { useSelector } from '@legendapp/state/react'
import {
  type FC,
  type ReactElement,
  type ReactNode,
  createElement,
} from 'react'

interface PropsIf<T> {
  if: Selector<T>
  ifReady?: never | undefined
}
interface PropsIfReady<T> {
  if?: never | undefined
  ifReady: Selector<T>
}

interface PropsBase<T> {
  else?: ReactNode | (() => ReactNode) | undefined
  $value?: Observable<T> | undefined
  wrap?: FC | undefined
  children: ReactNode | ((value: NonNullable<T>) => ReactNode)
}

type Props<T> = PropsBase<T> & (PropsIf<T> | PropsIfReady<T>)

export function Show<T>(props: Props<T>): ReactElement
export function Show<T>({
  if: if_,
  ifReady,
  else: else_,
  $value,
  wrap,
  children,
}: Props<T>): ReactElement {
  const value = useSelector(if_ ?? ifReady)
  const show = ifReady !== undefined ? isObservableValueReady(value) : value
  const child = useSelector(
    show
      ? isFunction(children)
        ? () => children($value ? $value.get() : value)
        : // biome-ignore lint/suspicious/noExplicitAny: yolo
          (children as any)
      : (else_ ?? null),
    { skipCheck: true },
  )

  return wrap ? createElement(wrap, undefined, child) : child
}
