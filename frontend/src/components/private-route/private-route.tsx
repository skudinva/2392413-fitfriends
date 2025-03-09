import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
//import { useAppSelector } from '../../hooks';
//import { getAuthorizationStatus } from '../../store/user-process/selectors';
//import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
};

const PrivateRoute = ({
  children,
  restrictedFor,
  redirectTo,
}: PrivateRouteProps): JSX.Element => {
  //const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authorizationStatus = AuthorizationStatus.NoAuth;

  //if (authorizationStatus === AuthorizationStatus.Unknown) {
  //  return <div>...Загружается</div>;
  //}

  return authorizationStatus !== restrictedFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
