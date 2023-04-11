import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import { buildAssertionFunction, toBe } from '../.internal/build-assertion-function.js';

/**
 * Returns true if the value is a string.
 *
 * @param value The value to compare.
 */
export const isString: AssertionFunction<string> = buildAssertionFunction(
  (value: unknown): value is string => {
    return typeof value === 'string';
  },
  toBe('a string'),
);
