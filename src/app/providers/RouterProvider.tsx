import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from '@/pages/SignIn';
import { SignUp } from '@/pages/SignUp/SignUp';
import { RecoveryPassword } from '@/pages/RecoveryPassword';
import { ResetCode } from '@/pages/ResetCode';
import { ResetPassword } from '@/pages/ResetPassword';
import { Home } from '@/pages/Home';
import { AuthLayout } from '../layouts';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <SignIn />,
        path: '/',
      },
      {
        element: <SignUp />,
        path: '/sign-up',
      },
      {
        element: <RecoveryPassword />,
        path: '/recovery-password',
      },
      {
        element: <ResetCode />,
        path: '/reset-code',
      },
      {
        element: <ResetPassword />,
        path: '/reset-password',
      },
    ],
  },
  {
    element: <Home />,
    path: '/home',
  },
]);
