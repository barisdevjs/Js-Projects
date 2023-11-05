import * as yup from 'yup';

export function formatReadableDate(dateString, locale = 'tr-TR') {
    const parsedDate = new Date(dateString);
  
    if (isNaN(parsedDate.getTime())) {
      return 'Not Updated';
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
  
  export const schema = yup.object().shape({
    title: yup
      .string()
      .trim()
      .required('Title is required')
      .min(3, 'Title is less than 3 chars')
      .max(5, 'Title is more than 5 chars'),
    description: yup
      .string()
      .trim()
      .required('Description is required')
      .min(5, 'Description is less than 5 chars')
      .max(10, 'Description is more than 10 chars'),
  });
  