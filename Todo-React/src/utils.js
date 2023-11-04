export function formatReadableDate(dateString, locale = 'tr-TR') {
    const parsedDate = new Date(dateString);
  
    if (isNaN(parsedDate.getTime())) {
      return 'Invalid Date';
    }
  
    const formattedDate = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(parsedDate);
  
    return formattedDate;
  }
  