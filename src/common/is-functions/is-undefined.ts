import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import { buildAssertionFunction, toBe } from '../.internal/build-assertion-function.js';

/**
 * Returns true if the value is undefined.
 * This is made available for use as a predicate, but using `x === undefined` instead is encouraged.
 *
 * @param value The value to compare.
 */
export const isUndefined: AssertionFunction<undefined> = buildAssertionFunction(
  (value: unknown): value is undefined => {
    return value === undefined;
  },
  toBe('undefined'),
);
