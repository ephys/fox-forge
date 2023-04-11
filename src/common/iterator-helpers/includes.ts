/**
 * Like {@link Array#includes}, but works with any iterable.
 */
export function includes(iterable: Iterable<unknown>, value: unknown): boolean {
  for (const item of iterable) {
    if (item === value) {
      return true;
    }
  }

  return false;
}
