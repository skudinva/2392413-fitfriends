import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import PersonalAccountCoachAdditional from '../personal-account-coach-additional/personal-account-coach-additional';

function PersonalAccountCoach(): JSX.Element {
  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link
          className="thumbnail-link thumbnail-link--theme-light is-disabled"
          to="#"
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
          className="thumbnail-link thumbnail-link--theme-light is-disabled"
          to="#"
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
        <div className="personal-account-coach__calendar">
          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/nearest-gym-01.jpg"
                  srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                  width="330"
                  height="190"
                  alt=""
                />
              </picture>
            </div>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">
                Скоро тут будет интересно
              </h3>
            </div>
          </div>
        </div>
      </div>
      <PersonalAccountCoachAdditional />
    </div>
  );
}

export default PersonalAccountCoach;
