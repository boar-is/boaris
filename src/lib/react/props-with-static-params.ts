export type PropsWithStaticParams<
  F extends () => Promise<ReadonlyArray<T>>,
  T = Awaited<ReturnType<F>>[number],
> = {
  params: T
}
