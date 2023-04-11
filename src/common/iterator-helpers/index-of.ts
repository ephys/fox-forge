/**
 * Like {@link Array#indexOf}, but works with any iterable.
 * Mainly useful for iterables that are index-based but don't inherit from Array, like DOM collections (NodeList, etc…).
 */
export function indexOf(iterable: Iterable<unknown>, value: unknown): number {
  let i = 0;

  for (const item of iterable) {
    if (item === value) {
      return i;
    }

    i++;
  }

  return -1;
}
