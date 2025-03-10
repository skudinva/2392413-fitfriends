import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from './const';
import Login from './pages/login/login';
import Main from './pages/main/main';
import NotFound from './pages/not-found/not-found';
import Registration from './pages/registration/registration';
import store from './store';

// Функция для рендеринга приложения
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
//<Provider store={store}>

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
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
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
