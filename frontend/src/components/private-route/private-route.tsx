import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import {
  getAuthorizationStatus,
  getUserInfo,
} from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';
import Spinner from '../spinner/spinner';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  allowForRole?: UserRole;
  redirectTo: AppRoute;
  children: JSX.Element;
};

function PrivateRoute({
  children,
  restrictedFor,
  redirectTo,
  allowForRole,
}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userInfo = useAppSelector(getUserInfo);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <div className="container">
        <Spinner />
      </div>
    );
  }

  if (
    authorizationStatus !== restrictedFor &&
    (!allowForRole || allowForRole === userInfo?.role)
  ) {
    return children;
  }

  return <Navigate to={redirectTo} />;
}

export default PrivateRoute;
