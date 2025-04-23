import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Order, Training } from '../../types/shared';

interface ThumbnailTrainingCardProps {
  training: Training;
  totalInfo?: Order;
  detailButtonStyle: 'comments-and-detail' | 'detail';
}

function ThumbnailTrainingCard({
  training,
  totalInfo,
  detailButtonStyle,
}: ThumbnailTrainingCardProps): JSX.Element {
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
            {!training.price ? 'бесплатно' : training.price}
          </span>
          <span>{training.price ? '₽' : ''}</span>
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
        {detailButtonStyle === 'detail' && (
          <Link
            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
            to={`${AppRoute.Trainings}/${training.id}`}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link>
        )}
        {detailButtonStyle === 'comments-and-detail' && (
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
        )}
      </div>
      {totalInfo && (
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {totalInfo.amount}
            </p>
            <p className="thumbnail-training__total-info-text">
              Куплено тренировок
            </p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">
              {totalInfo.totalPrice}
              <span>₽</span>
            </p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThumbnailTrainingCard;
