import { createBrowserRouter } from 'react-router-dom';
import App from './components/app/app';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
]);
