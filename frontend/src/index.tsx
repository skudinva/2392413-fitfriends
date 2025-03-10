import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import store from './store';

// Функция для рендеринга приложения
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
//<Provider store={store}>

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
