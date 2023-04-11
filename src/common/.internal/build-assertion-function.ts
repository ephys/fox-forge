import { inspect } from '../inspect.js';

export function buildAssertionFunction<AssertedType>(
  isAssertedType: (value: unknown) => value is AssertedType,
  buildError: (value: unknown, shouldEqual: boolean) => string,
): AssertionFunction<AssertedType> {
  const isType = (value: unknown): value is AssertedType => {
    return isAssertedType(value);
  };

  isType.not = <Value>(value: Value): value is Exclude<Value, AssertedType> => {
    return !isAssertedType(value);
  };

  isType.assert = (value: unknown, message?: string): asserts value is AssertedType => {
    if (!isType(value)) {
      throw new Error(message ?? buildError(value, true));
    }
  };

  isType.assertNot = <Value>(value: Value, message?: string): asserts value is Exclude<Value, AssertedType> => {
    if (isType(value)) {
      throw new Error(message ?? buildError(value, false));
    }
  };

  return isType;
}

export interface AssertionFunction<AssertedType> {
  (value: unknown): value is AssertedType;

  /**
   * For use as a predicate callback. Prefer using `!` instead if you are not using it as a predicate.
   *
   * @example
   * // exclude all strings
   * // for readability, consider something like filterOut(array, isString)
   * [].filter(isString.not)
   */
  not<Value>(value: Value): value is Exclude<Value, AssertedType>;
  assert(value: unknown, message?: string): asserts value is AssertedType;
  assertNot<Value>(value: Value, message?: string): asserts value is Exclude<Value, AssertedType>;
}

export function toBe(typeName: string) {
  return function buildError(value: unknown, shouldEqual: boolean): string {
    return `expected value ${shouldEqual ? '' : 'not '}to be ${typeName} but got ${inspect(value)} instead`;
  };
}