import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import { buildAssertionFunction, toBe } from '../.internal/build-assertion-function.js';

/**
 * Returns true if the value is null.
 * This is made available for use as a predicate, but using `x === null` instead is encouraged.
 *
 * @param value The value to compare.
 */
export const isNull: AssertionFunction<null> = buildAssertionFunction(
  (value: unknown): value is null => {
    return value === null;
  },
  toBe('null'),
);
