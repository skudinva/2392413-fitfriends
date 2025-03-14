import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import Friends from '../../pages/friends/friends';
import Home from '../../pages/home/home';
import Intro from '../../pages/intro/intro';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import PersonalAccount from '../../pages/personal-account/personal-account';
import Purchases from '../../pages/purchases/purchases';
import Registration from '../../pages/registration/registration';
import PrivateRoute from '../private-route/private-route';

function AppRouter() {
  return (
    <Routes>
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
      <Route element={<Main />}>
        <Route
          index
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.PersonalAccount}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <PersonalAccount />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Friends}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <Friends />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Purchases}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <Purchases />
            </PrivateRoute>
          }
        />
      </Route>
      <Route element={<Main />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
