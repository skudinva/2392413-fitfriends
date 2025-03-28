import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: JSX.Element;
};

function PrivateRoute({
  children,
  restrictedFor,
  redirectTo,
}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }
  return authorizationStatus !== restrictedFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}

export default PrivateRoute;
