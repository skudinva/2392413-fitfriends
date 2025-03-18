import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';
import history from './history';
import store from './store';
import { fetchUserStatus } from './store/user-action';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);

store.dispatch(fetchUserStatus());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App />
        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
