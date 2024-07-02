export function convertToISOString(day: number, month: number, year: number) {
  const date = new Date(Date.UTC(year, month, day)); // Month is zero-indexed
  return date.toISOString();
}

export function convertToLocaleTime(dateISO: any) {
  let date = new Date(dateISO);

  let options: {} = { hour: "numeric", minute: "numeric", hour12: true };
  let timeString = date.toLocaleTimeString("en-US", options);
  return timeString;
}
