import { isFunction } from '../is-functions/is-function.js';

/**
 * Inserts an element between each element of a list.
 * Does not modify the original list. It returns a new list.
 *
 * If the separator is a function, it will be called with the index of the element after which the separator will be inserted,
 * and the return value will be used as the separator.
 *
 * @param list The list to insert into
 * @param separator The element to insert between each element of the list, or a function that returns the element to insert
 * @returns A new list with the separator inserted between each element of the original list
 */
export function intersperse<Val, Sep>(
  list: Val[],
  separator: Sep | ((index: number) => Sep),
): Array<Val | Sep> {
  const res: Array<Val | Sep> = [];

  if (list.length === 0) {
    return res;
  }

  const separatorIsFunction = isFunction(separator);

  let i = 0;

  res.push(list[i++]!);
  while (i < list.length) {
    res.push(separatorIsFunction ? separator(i) : separator, list[i++]!);
  }

  return res;
}
