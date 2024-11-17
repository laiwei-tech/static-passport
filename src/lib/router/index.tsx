import { createBrowserRouter } from 'react-router-dom';
import Login from '../../pages/login/page';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
  ],
  {
    basename: '/passport',
  },
);
