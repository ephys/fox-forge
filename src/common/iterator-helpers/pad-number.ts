/**
 * Stringifies a number and ensures the resulting string is at least {length} characters long by adding 0 in front of it.
 *
 * @param value The number to stringify
 * @param length The minimum length of the resulting string
 */
export function padNumber(value: number, length: number): string {
  return value.toString().padStart(length, '0');
}
