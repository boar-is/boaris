export type PropsWithStaticParams<
  F extends () => Promise<Array<T>>,
  T = Awaited<ReturnType<F>>[number],
> = {
  params: T
}
