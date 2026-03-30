import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow, format, differenceInYears, differenceInMonths } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM d, yyyy');
}

export function formatMonthYear(dateStr: string): string {
  return format(new Date(dateStr), 'MMM yyyy');
}

export function careerDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = differenceInYears(end, start);
  const months = differenceInMonths(end, start) % 12;
  if (years === 0) return `${months}mo`;
  if (months === 0) return `${years}y`;
  return `${years}y ${months}mo`;
}

export function totalCareerDuration(startDates: string[]): string {
  if (startDates.length === 0) return '0y';
  const earliest = startDates.reduce((a, b) => (a < b ? a : b));
  return careerDuration(earliest);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function formatResumetBullet(title: string, impact: string, date: string): string {
  return `• ${title}: ${impact} (${formatMonthYear(date)})`;
}
