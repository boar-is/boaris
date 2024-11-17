export const forcedGroupBy = <T, K extends string | number>(
  array: Array<T>,
  keyFn: (item: T) => K,
) =>
  array.reduce(
    (acc, cur) => {
      acc[keyFn(cur)] = cur
      return acc
    },
    {} as Record<K, T>,
  )
