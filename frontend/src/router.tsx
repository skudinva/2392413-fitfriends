import { createBrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import PrivateRoute from './components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from './const';

export const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <App />,
  },
  {
    path: AppRoute.Login,
    element: (
      <PrivateRoute
        restrictedFor={AuthorizationStatus.Auth}
        redirectTo={AppRoute.Root}
      >
        <div>Тут что-то полезное</div>
      </PrivateRoute>
    ),
  },
  {
    path: AppRoute.Register,
    element: (
      <PrivateRoute
        restrictedFor={AuthorizationStatus.NoAuth}
        redirectTo={AppRoute.Root}
      >
        <div>Тут что-то полезное</div>
      </PrivateRoute>
    ),
  },
  {
    path: '/*',
    element: <div>Not Found 404</div>,
  },
]);
