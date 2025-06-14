import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import NoDataFound from '../no-data-found/no-data-found';

function PersonalAccountUser(): JSX.Element {
  return (
    <div className="personal-account-user">
      <div className="personal-account-user__schedule">
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на день, ккал
                </span>
                <input
                  type="text"
                  name="schedule-for-the-day"
                  defaultValue="3 300"
                  className=""
                />
              </label>
            </div>
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">
                  План на неделю, ккал
                </span>
                <input
                  type="text"
                  name="schedule-for-the-week"
                  defaultValue="23 100"
                  className=""
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.Friends}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.Purchases}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-shopping-cart"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои покупки</span>
        </Link>
        <NoDataFound />
      </div>
    </div>
  );
}

export default PersonalAccountUser;
