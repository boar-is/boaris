export type WithStaticParams<F> = F extends () => Promise<
  ReadonlyArray<infer T>
>
  ? { params: Promise<T> }
  : never
