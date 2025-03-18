import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUserInfo } from '../../store/user-action';
import {
  getAuthorizationStatus,
  getCurrentUser,
} from '../../store/user-process/selectors';
import AppRouter from '../app-router/app-router';

function App() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentUser = useAppSelector(getCurrentUser);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUserInfo(currentUser.sub));
    }
  }, [authorizationStatus, currentUser, dispatch]);

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
