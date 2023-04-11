import type { AssertionFunction } from '../common/.internal/build-assertion-function.js';
import { buildAssertionFunction, toBe } from '../common/.internal/build-assertion-function.js';

/**
 * Returns whether this is a Node ErrnoException,
 * which is a plain Node error, with .code added to it
 *
 * @see https://nodejs.org/api/errors.html#errorcode_1
 */
export const isNodeError: AssertionFunction<NodeJS.ErrnoException> = buildAssertionFunction(
  (val: any): val is NodeJS.ErrnoException => {
    return val instanceof Error && 'code' in val;
  },
  toBe('a Node ErrnoException'),
);
