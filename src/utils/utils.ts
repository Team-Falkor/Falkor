/**
 * Returns a human-readable string representing the time difference between the
 * current time and the given date, e.g. "3 hours ago", "1 minute ago"
 *
 * @param date - The date to compare the current time to
 * @returns A string representing the time difference
 */
export const timeSince = (date: number): string => {
  const seconds = Math.floor((Date.now() - date) / 1000); // Difference in seconds
  const suffix = seconds === 1 ? '' : 's'; // Pluralize the word 'second'

  // Less than a minute
  if (seconds < 60) return `${seconds} second${suffix} ago`;

  // Less than an hour
  const minutes = Math.floor(seconds / 60); // Difference in minutes
  const minsSuffix = minutes === 1 ? '' : 's'; // Pluralize the word 'minute'
  if (minutes < 60) return `${minutes} minute${minsSuffix} ago`;

  // Less than a day
  const hours = Math.floor(minutes / 60); // Difference in hours
  const hourSuffix = hours === 1 ? '' : 's'; // Pluralize the word 'hour'
  if (hours < 24) return `${hours} hour${hourSuffix} ago`;

  // Less than a week
  const days = Math.floor(hours / 24); // Difference in days
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;

  // Less than a month
  const weeks = Math.floor(days / 7); // Difference in weeks
  if (weeks < 4) return `${weeks} week${weeks === 1 ? '' : 's'} ago`;

  // Less than a year
  const months = Math.floor(weeks / 4); // Difference in months
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

  // More than a year
  const years = Math.floor(months / 12); // Difference in years
  return `${years} year${years === 1 ? '' : 's'} ago`;
};
