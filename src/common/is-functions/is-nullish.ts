import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import { buildAssertionFunction, toBe } from '../.internal/build-assertion-function.js';

/**
 * Returns true if the value is null or undefined.
 *
 * @param value The value to compare.
 */
export const isNullish: AssertionFunction<null | undefined> = buildAssertionFunction(
  (value: unknown): value is null | undefined => {
    return value === null || value === undefined;
  },
  toBe('null or undefined'),
);
