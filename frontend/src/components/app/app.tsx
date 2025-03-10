import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Registration from '../../pages/registration/registration';
import PrivateRoute from '../private-route/private-route';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route element={<Main />}>
            <Route
              index
              element={
                <PrivateRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Register}
              element={
                <PrivateRoute
                  restrictedFor={AuthorizationStatus.Auth}
                  redirectTo={AppRoute.Root}
                >
                  <Registration />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
