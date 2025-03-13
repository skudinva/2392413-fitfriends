import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainNav from '../main-nav/main-nav';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Root}
          aria-label="Переход на главную"
        >
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <MainNav />

        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <Link className="search__link" to="#">
                  Бокс
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link is-active" to="#">
                  Бег
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Аэробика
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
              <li className="search__item">
                <Link className="search__link" to="#">
                  Text
                </Link>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
