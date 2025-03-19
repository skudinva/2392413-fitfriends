import BackButton from '../back-button/back-button';

function Comments(): JSX.Element {
  return (
    <aside className="reviews-side-bar">
      <BackButton baseClassName="btn-flat--underlined reviews-side-bar__back" />
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-1.webp, img/content/avatars/users/photo-1@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-1.png"
                    srcSet="img/content/avatars/users/photo-1@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Никита</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>5</span>
              </div>
            </div>
            <p className="review__comment">
              Эта тренировка для меня зарядка по&nbsp;утрам, помогает
              проснуться.
            </p>
          </div>
        </li>
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-2.webp, img/content/avatars/users/photo-2@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-2.png"
                    srcSet="img/content/avatars/users/photo-2@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Дарья</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>5</span>
              </div>
            </div>
            <p className="review__comment">
              Спасибо, классная тренировка! Понятная и&nbsp;интересная,
              с&nbsp;акцентом на&nbsp;правильную технику, как я&nbsp;люблю.
            </p>
          </div>
        </li>
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-3.webp, img/content/avatars/users/photo-3@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-3.png"
                    srcSet="img/content/avatars/users/photo-3@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Катерина</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>4</span>
              </div>
            </div>
            <p className="review__comment">
              Хорошая тренировка, но&nbsp;все&nbsp;же не&nbsp;хватило немного
              динамики. Для меня оказалась слишком легкой.
            </p>
          </div>
        </li>
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-4.webp, img/content/avatars/users/photo-4@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-4.png"
                    srcSet="img/content/avatars/users/photo-4@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Татьяна</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>5</span>
              </div>
            </div>
            <p className="review__comment">
              Регулярно выполняю эту тренировку дома и&nbsp;вижу результат!
              Спина стала прямее, появилось больше сил и&nbsp;гибкость тоже
              стала лучше, хотя упражнения довольно простые.
            </p>
          </div>
        </li>
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-5.webp, img/content/avatars/users/photo-5@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-5.png"
                    srcSet="img/content/avatars/users/photo-5@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Наталья</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>5</span>
              </div>
            </div>
            <p className="review__comment">
              Ну&nbsp;какой&nbsp;же кайф! Спасибо, крутая программа.
              С&nbsp;музыкой вообще супер! Действительно, Energy!
            </p>
          </div>
        </li>
        <li className="reviews-side-bar__item">
          <div className="review">
            <div className="review__user-info">
              <div className="review__user-photo">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="img/content/avatars/users/photo-1.webp, img/content/avatars/users/photo-1@2x.webp 2x"
                  />
                  <img
                    src="img/content/avatars/users/photo-1.png"
                    srcSet="img/content/avatars/users/photo-1@2x.png 2x"
                    width="64"
                    height="64"
                    alt="Изображение пользователя"
                  />
                </picture>
              </div>
              <span className="review__user-name">Никита</span>
              <div className="review__rating">
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <span>5</span>
              </div>
            </div>
            <p className="review__comment">
              Эта тренировка для меня зарядка по&nbsp;утрам, помогает
              проснуться.
            </p>
          </div>
        </li>
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
