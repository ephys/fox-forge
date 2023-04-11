import type { ReadonlyRecord } from './types.js';

export const EMPTY_ARRAY: readonly any[] = Object.freeze([]);

export const EMPTY_OBJECT: ReadonlyRecord<PropertyKey, any> = Object.freeze(Object.create(null));
