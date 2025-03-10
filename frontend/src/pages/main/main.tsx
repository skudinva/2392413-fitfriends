import { Outlet } from 'react-router-dom';

function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
