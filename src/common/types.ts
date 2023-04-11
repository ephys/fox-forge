export type MaybePromise<T> = T | Promise<T>;

export type Nullish = null | undefined;

export type NonUndefined<T> = T extends undefined ? never : T;

export type NonNull<T> = T extends null ? never : T;

export type NonNullish<T> = NonNullable<T>;

/**
 * Represents any plain function (no `this`)
 */
export type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Represents any constructable value
 */
export type AnyConstructor = new (...args: unknown[]) => unknown;

/**
 * Represents any plain object (or Record, as TypeScript calls it).
 *
 * Prefer {@link UnknownRecord} unless you're encountering issues with it.
 */
export type AnyRecord = Record<PropertyKey, any>;

/**
 * Represents any plain object (or Record, as TypeScript calls it)
 *
 * Stricter than {@link AnyRecord}. Not all records can be assigned to this value due to how TypeScript works
 * but its usage is recommended because the value won't be typed as any.
 */
export type UnknownRecord = Record<PropertyKey, unknown>;

/**
 * Marks some keys of the object as optional
 */
export type PartialByKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Marks some keys of the object as required
 */
export type RequiredByKey<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Returns true if the two generics are equal
 */
export type Equals<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false;

/**
 * Returns the elements accepted by the array
 */
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends ReadonlyArray<
    infer ElementType
  >
  ? ElementType
  : never;

export type JSONArray = JSONValue[];
export type JSONObject = { [key: string]: JSONValue };
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
