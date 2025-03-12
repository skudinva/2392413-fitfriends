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
                  value="3 300"
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
                  value="23 100"
                  className=""
                />
              </label>
            </div>
          </div>
        </form>
      </div>
      <div className="personal-account-user__additional-info">
        <a className="thumbnail-link thumbnail-link--theme-light" href="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </a>
        <a className="thumbnail-link thumbnail-link--theme-light" href="#">
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-shopping-cart"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои покупки</span>
        </a>
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
              Скоро тут появится что-то полезное
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccountUser;
