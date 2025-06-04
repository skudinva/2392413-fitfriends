import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import CreateTraining from '../../pages/create-training/create-training';
import Friends from '../../pages/friends/friends';
import Home from '../../pages/home/home';
import Intro from '../../pages/intro/intro';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import MyTrainings from '../../pages/my-trainings/my-trainings';
import NotFound from '../../pages/not-found/not-found';
import Orders from '../../pages/orders/orders';
import PersonalAccount from '../../pages/personal-account/personal-account';
import Purchases from '../../pages/purchases/purchases';
import Registration from '../../pages/registration/registration';
import TrainingCard from '../../pages/training-card/training-card';
import Trainings from '../../pages/trainings/trainings';
import UserCard from '../../pages/user-card/user-card';
import UsersCatalog from '../../pages/users-catalog/users-catalog';
import { getUserRole } from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';
import PrivateRoute from '../private-route/private-route';

function AppRouter() {
  const userRole = useAppSelector(getUserRole);

  const redirectUrl =
    userRole === UserRole.Coach ? AppRoute.PersonalAccount : AppRoute.Intro;

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
              redirectTo={redirectUrl}
              allowForRole={UserRole.Sportsman}
            >
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.CreateTraining}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
              allowForRole={UserRole.Coach}
            >
              <CreateTraining />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Orders}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
              allowForRole={UserRole.Coach}
            >
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.CoachTrainings}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
              allowForRole={UserRole.Coach}
            >
              <MyTrainings />
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
          path={AppRoute.Trainings}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={redirectUrl}
              allowForRole={UserRole.Sportsman}
            >
              <Trainings />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Trainings}/:trainingId`}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <TrainingCard />
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
          path={AppRoute.FindFriends}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
              allowForRole={UserRole.Sportsman}
            >
              <UsersCatalog />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Purchases}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={redirectUrl}
              allowForRole={UserRole.Sportsman}
            >
              <Purchases />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.UserCard}/:userId`}
          element={
            <PrivateRoute
              restrictedFor={AuthorizationStatus.NoAuth}
              redirectTo={AppRoute.Intro}
            >
              <UserCard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
