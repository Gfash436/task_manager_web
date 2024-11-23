export const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAY_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDate(dateStr: string) {
  const new_date = new Date(dateStr);

  const dayOfTheWeek = new_date.getDay();
  const day = new_date.getDate();
  const month = new_date.getMonth();
  const year = new_date.getFullYear();

  return `${DAY_OF_THE_WEEK[dayOfTheWeek]} ${MONTHS_SHORT[month]} ${String(
    day
  ).padStart(2, "0")}, ${year}`;
}

export function getInputDate(dateStr: string) {
  const new_date = new Date(dateStr);

  const day = new_date.getDate();
  const month = new_date.getMonth() + 1;
  const year = new_date.getFullYear();

  return `${year}-${month.toString().padStart(2, "0")}-${day}`;
}
