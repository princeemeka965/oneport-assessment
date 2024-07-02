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

export function checkCurrentDate(day: number, month: number, year: number) {
  const date = `${day}-${month + 1}-${year}`;

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Return the formatted date string
  const formattedCurrentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  return formattedCurrentDate === date;
}
