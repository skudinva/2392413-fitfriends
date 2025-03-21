import { useAppSelector } from '../../hooks';
import {
  getIsTrainingCommentLoading,
  getTrainingComment,
} from '../../store/site-data/selectors';
import BackButton from '../back-button/back-button';
import Spinner from '../spinner/spinner';

function Comments(): JSX.Element {
  const comment = useAppSelector(getTrainingComment);
  const isCommentLoading = useAppSelector(getIsTrainingCommentLoading);

  if (isCommentLoading) {
    return <Spinner />;
  }

  return (
    <aside className="reviews-side-bar">
      <BackButton baseClassName="btn-flat--underlined reviews-side-bar__back" />
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {comment &&
          comment.entities.map((review) => (
            <li className="reviews-side-bar__item" key={`review-${review.id}`}>
              <div className="review">
                <div className="review__user-info">
                  <div className="review__user-photo">
                    <picture>
                      <img
                        src={review.userInfo.avatar}
                        width="64"
                        height="64"
                        alt="Изображение пользователя"
                      />
                    </picture>
                  </div>
                  <span className="review__user-name">
                    {review.userInfo.name}
                  </span>
                  <div className="review__rating">
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="review__comment">{review.message}</p>
              </div>
            </li>
          ))}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
      >
        Оставить отзыв
      </button>
    </aside>
  );
}

export default Comments;
