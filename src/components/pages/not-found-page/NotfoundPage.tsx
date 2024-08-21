import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const NotfoundPage: FC = () => {
  return <Navigate to="/" replace />;
};

export default NotfoundPage;
