import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../app-router/app-router';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
