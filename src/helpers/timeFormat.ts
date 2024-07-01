export function convertToISOString(day: number, month: number, year: number) {
  const date = new Date(Date.UTC(year, month, day)); // Month is zero-indexed
  return date.toISOString();
}
