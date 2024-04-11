import { format as formatDate, parse as parseDate } from "date-fns";

export function parseDateFromString(dateString: string): Date {
  return parseDate(dateString, "EEE MMM dd HH:mm:ss 'GMT' yyyy", new Date());
}

export function formatDateToString(date: Date): string {
  return formatDate(date, "EEE MMM dd HH:mm:ss 'GMT' yyyy");
}
