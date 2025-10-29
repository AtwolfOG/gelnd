export function getTime(time: number) {
  const minutes = Math.floor((time % 3600000) / 60000);
  const hours = Math.floor(time / (1000 * 60 * 60));
  return hours ? `${hours}hr ${minutes}m` : `${minutes}m`;
}

export function getProgress(previous: number, current: number): string {
  if (current >= previous) {
    return `+${Math.round((1 - current / previous) * 100)}%`;
  } else {
    return `${Math.round((current / previous - 1) * 100)}%`;
  }
}
