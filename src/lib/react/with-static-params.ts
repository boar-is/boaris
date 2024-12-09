export type WithStaticParams<
  F extends () => Promise<ReadonlyArray<T>>,
  T = Awaited<ReturnType<F>>[number],
> = {
  params: Promise<T>
}
