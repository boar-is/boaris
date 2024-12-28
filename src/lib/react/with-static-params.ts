export type WithStaticParams<F extends () => Promise<ReadonlyArray<unknown>>> =
  F extends () => Promise<ReadonlyArray<infer T>>
    ? { params: Promise<T> }
    : never
