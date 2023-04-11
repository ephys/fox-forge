/**
 * Like {@link Array#forEach}, but works with any iterable.
 */
export function forEach<T>(iterable: Iterable<T>, cb: (item: T, index: number) => void) {
  let i = 0;

  for (const item of iterable) {
    cb(item, i++);
  }
}
