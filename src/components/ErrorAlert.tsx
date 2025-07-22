import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FunctionComponent<ErrorAlertProps> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
    {message}
  </div>
);

export default ErrorAlert;
