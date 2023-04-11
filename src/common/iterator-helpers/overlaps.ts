import { includes } from './includes.js';

export function overlaps<T>(array1: Iterable<T>, array2: Iterable<T>): boolean {
  for (const item of array1) {
    if (includes(array2, item)) {
      return true;
    }
  }

  return false;
}
