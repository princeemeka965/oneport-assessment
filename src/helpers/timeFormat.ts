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

export function formatISODate(isoDate: any) {
  // Parse the ISO date string into a Date object
  const date = new Date(isoDate);

  // Get day, month, and year from the Date object
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${day}/${month}/${year}`;
}

export function getDayName(isoDate: any) {
  // Parse the ISO date string into a Date object
  const date = new Date(isoDate);

  // Array of day names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day of the week (0-6) using UTC time
  const dayIndex = date.getUTCDay();

  // Return the corresponding day name
  return days[dayIndex];
}

export function formatDateToString(dateString: string): string {
  const date = new Date(dateString);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const daySuffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${dayName} ${day}${daySuffix(day)} ${month}, ${year}`;
}
