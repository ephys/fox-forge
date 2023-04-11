import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import {
  buildAssertionFunction,
  toBe,
} from '../.internal/build-assertion-function.js';

/**
 * Returns true if the value is a JS bigint.
 *
 * @param value The value to compare.
 */
export const isBigInt: AssertionFunction<bigint> = buildAssertionFunction(
  (value: unknown): value is bigint => {
    return typeof value === 'bigint';
  },
  toBe('a bigint'),
);
