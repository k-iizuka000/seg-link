import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from './common/ErrorMessage';

const NotFound: React.FC = () => {
  return (
    <ErrorMessage
      title="404 - Page Not Found"
      message={
        <>
          The page you are looking for does not exist.
          <br />
          <Link to="/">Return to Home</Link>
        </>
      }
    />
  );
};

export default NotFound;
