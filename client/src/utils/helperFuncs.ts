import { format } from 'date-fns';

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

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "dd/MM/yy',' h':'mm a");
};
