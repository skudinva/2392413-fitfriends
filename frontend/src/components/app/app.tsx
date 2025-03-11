import { HelmetProvider } from 'react-helmet-async';
import AppRouter from '../app-router/app-router';

function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
