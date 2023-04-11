/**
 * Merges iterables together. The resulting iterator will iterate over all the values of the given iterables in order.
 *
 * @example
 * for (const val of combinedIterator([1], [2, 3])) {
 *   console.log(val);
 * }
 *
 * // results in
 * // 1
 * // 2
 * // 3
 *
 * @param iterables All iterables to chain
 */
export function *combinedIterator<T>(
  ...iterables: Array<Iterable<T>>
): Generator<T, void, undefined> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
