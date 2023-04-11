import type { MaybePromise } from '../types.js';
import { map } from './map.js';

/**
 * Executes async code in parallel for each value of an iterable.
 *
 * @param iterable The iterable
 * @param callback The function to call with each entry of the array
 * @returns A promise that resolves once each callback is done executing (and their promise resolved)
 */
export async function parallelForEach<T>(
  iterable: Iterable<T>,
  callback: (value: T, index: number) => MaybePromise<any>,
): Promise<void> {
  await Promise.all(map(iterable, callback));
}
