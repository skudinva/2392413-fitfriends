import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Intro from '../../pages/intro/intro';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';
import Registration from '../../pages/registration/registration';
import PrivateRoute from '../private-route/private-route';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route
            index
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Intro}
              >
                <Product />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Intro}
            element={
              <PrivateRoute
                restrictedFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Root}
              >
                <Intro />
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
  );
}

export default AppRouter;
