import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutUser } from '../../store/user-action';

function MainNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pathname } = location;

  const onLogoutButtonClick = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link
            className={`main-nav__link ${
              pathname === AppRoute.Root ||
              pathname === AppRoute.CreateTraining ||
              pathname === AppRoute.CoachTrainings ||
              pathname === AppRoute.Orders ||
              pathname === AppRoute.FindFriends ||
              pathname.startsWith(AppRoute.UserCard) ||
              pathname.startsWith(AppRoute.Trainings)
                ? 'is-active'
                : ''
            }`}
            to={AppRoute.Root}
            aria-label="На главную"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={`main-nav__link ${
              pathname === AppRoute.PersonalAccount ? 'is-active' : ''
            }`}
            to={AppRoute.PersonalAccount}
            aria-label="Личный кабинет"
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={`main-nav__link ${
              pathname === AppRoute.Friends ? 'is-active' : ''
            }`}
            to={AppRoute.Friends}
            aria-label="Друзья"
          >
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--notifications is-disabled">
          <Link className="main-nav__link" to="#" aria-label="Уведомления">
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="#icon-notification"></use>
            </svg>
          </Link>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist">
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Катерина пригласила вас на&nbsp;тренировку
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-23 12:35"
                  >
                    23 декабря, 12:35
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Никита отклонил приглашение на&nbsp;совместную тренировку
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-22 09:22"
                  >
                    22 декабря, 09:22
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">
                    Татьяна добавила вас в&nbsp;друзья
                  </p>
                  <time
                    className="notification__time"
                    dateTime="2023-12-18 18:50"
                  >
                    18 декабря, 18:50
                  </time>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="main-nav__item">
          <button
            className="main-nav__link"
            type="button"
            onClick={onLogoutButtonClick}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Выход</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
