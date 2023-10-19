const formatDateToHumanReadable = (isoDateString: string, options: Intl.DateTimeFormatOptions = {}): string => {
  // Default options for formatting
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  // Merge provided options with default options
  const mergedOptions: Intl.DateTimeFormatOptions = {
    ...defaultOptions,
    ...options,
  };

  // Parse the ISO date string
  const date = new Date(isoDateString);

  // Format the date into a human-readable format
  const formattedDate = date.toLocaleDateString(undefined, mergedOptions);

  return formattedDate;
}

export default formatDateToHumanReadable;
