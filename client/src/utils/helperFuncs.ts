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
