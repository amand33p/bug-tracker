import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const ErrorBox: React.FC<{ errorMsg: string; clearErrorMsg: () => void }> = ({
  errorMsg,
  clearErrorMsg,
}) => {
  if (!errorMsg) return null;

  return (
    <div style={{ width: '100%', marginTop: '0.8em', marginBottom: '0.8em' }}>
      <Alert severity="error" onClose={clearErrorMsg}>
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
    </div>
  );
};

export default ErrorBox;
