export const getLocalDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatISODateWithLocalContext = (baseDateStr: string, timeSource: Date = new Date()): string => {
  // baseDateStr is expected to be YYYY-MM-DD
  const hours = String(timeSource.getHours()).padStart(2, '0');
  const minutes = String(timeSource.getMinutes()).padStart(2, '0');
  const seconds = String(timeSource.getSeconds()).padStart(2, '0');
  const milliseconds = String(timeSource.getMilliseconds()).padStart(3, '0');
  
  return `${baseDateStr}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
