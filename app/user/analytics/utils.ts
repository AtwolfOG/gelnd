export function getTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}hr ${minutes}m` : `${Math.round(minutes)}m`;
}

export function getProgress(previous: number, current: number): string {
  if (!current && !previous) return "0%";
  if (!current) return "-100%";
  if (!previous) return "+100%";
  if (current >= previous) {
    return `+${Math.round((current / previous - 1) * 100)}%`;
  } else {
    return `${Math.round((current / previous - 1) * 100)}%`;
  }
}
