import { format, formatDistanceToNowStrict } from 'date-fns';

interface ReturnedError {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export const getErrorMsg = (err: ReturnedError) => {
  if (err?.response?.data?.message) {
    return err.response.data.message;
  } else {
    return err.message;
  }
};

export const truncateString = (text: string, maxCharLimit: number) => {
  return text.length < maxCharLimit
    ? text
    : text.slice(0, maxCharLimit) + '...';
};

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "dd/MM/yy',' h':'mm a");
};

export const formatDateInWords = (date: Date) => {
  return format(new Date(date), "MMM d', ' YYY");
};

export const formatTimeAgo = (date: Date) => {
  return formatDistanceToNowStrict(new Date(date));
};
