import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import {
  buildAssertionFunction,
  toBe,
} from '../.internal/build-assertion-function.js';

/**
 * Returns whether the provided value is a JavaScript Object (i.e. anything but a primitive).
 */
export const isAnyObject: AssertionFunction<object> = buildAssertionFunction(
  (value: unknown): value is object => {
    if (value === null) {
      return false;
    }

    const type = typeof value;

    return type === 'object' || type === 'function';
  },
  toBe('any object'),
);
