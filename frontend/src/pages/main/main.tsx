import { Outlet } from 'react-router-dom';
import Header from '../../components/header/header';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
