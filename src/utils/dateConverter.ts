
/**
 * @desc: convert date to now
 * @param date (createdAt)
 * @returns example: December 29, 2025
 */
export function convertDate(date: string): string {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const dayOfMonth = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${dayOfMonth}, ${year}`;
}
/**
 * @desc: convert time to now
 * @param createdAt: 2025-11-29T13:06:37.649Z 
 * @returns  9:30 PM
 */
export function convertTime(time: string): string {
  const date = new Date(time);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
}

/** 
* @desc: convert date and time to now
* @param createdAt: 2025-11-29T13:06:37.649Z 
* @returns  9:30 PM or today / yesterday
*/
export const dayTimeConverter = (date: string): string => {
  if (!date) return "";
  const newDate = new Date(date);
  const time = newDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // today or yesterday or date
  let dateDisplay = "";
  const isToday = new Date().toDateString() === newDate.toDateString();
  if (isToday) dateDisplay = "today";

  const isYesterday = new Date().toDateString() === newDate.toDateString();
  if (isYesterday) dateDisplay = "yesterday";

  if (!isToday && !isYesterday) dateDisplay = dayTimeConverter(date);

  return `${time}, ${dateDisplay}`;
};
