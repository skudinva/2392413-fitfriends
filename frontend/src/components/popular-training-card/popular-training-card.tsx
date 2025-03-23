import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Training } from '../../types/shared';

interface PopularTrainingCardProps {
  training: Training;
}

function PopularTrainingCard({
  training,
}: PopularTrainingCardProps): JSX.Element {
  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img src={training.image} width="330" height="190" alt="" />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {training.price}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{training.type}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{training.calories}ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">
              {training.rating}
            </span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            className="btn btn--small thumbnail-training__button-catalog"
            to={`${AppRoute.Trainings}/${training.id}`}
          >
            Подробнее
          </Link>
          <Link
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            to={`${AppRoute.Trainings}/${training.id}`}
          >
            Отзывы
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PopularTrainingCard;
