import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import NoDataFound from '../no-data-found/no-data-found';
import PersonalAccountCoachAdditional from '../personal-account-coach-additional/personal-account-coach-additional';

function PersonalAccountCoach(): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.CoachTrainings}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.CreateTraining}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light is-disabled"
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
          to={AppRoute.Orders}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
        <div className="personal-account-coach__calendar">
          <NoDataFound />
        </div>
      </div>
      <PersonalAccountCoachAdditional />
    </div>
  );
}

export default PersonalAccountCoach;
