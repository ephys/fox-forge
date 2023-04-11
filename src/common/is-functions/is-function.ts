import type { AssertionFunction } from '../.internal/build-assertion-function.js';
import {
  buildAssertionFunction,
  toBe,
} from '../.internal/build-assertion-function.js';

/**
 * Returns true if a value is a function:
 *
 * isFunction(() => {}); // true
 * isFunction(class A {}); // true
 * isFunction((class {}).bind()); // true
 */
export const isFunction: AssertionFunction<Function> = buildAssertionFunction(
  (value: unknown): value is Function => {
    return typeof value === 'function';
  },
  toBe('a function'),
);
