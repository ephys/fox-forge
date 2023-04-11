/**
 * Counts how many elements in the iterable match the predicate.
 *
 * @returns how many elements in the iterable match the predicate.
 */
export function count<In>(
  iterable: Iterable<In>,
  cb: (item: In, index: number) => boolean,
): number {
  let i = 0;
  let matchCount = 0;

  for (const item of iterable) {
    if (cb(item, i++)) {
      matchCount++;
    }
  }

  return matchCount;
}
