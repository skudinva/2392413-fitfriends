import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import Spinner from '../../components/spinner/spinner';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFriend } from '../../store/user-action';
import {
  getFriend,
  getIsFriendLoading,
} from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';
import { getTrainingStatus } from '../../utils';

const VISUAL_HASHTAG_COUNT = 3;

function Friends(): JSX.Element {
  const dispatch = useAppDispatch();
  const isFriendLoading = useAppSelector(getIsFriendLoading);
  const friend = useAppSelector(getFriend);
  const [page, setPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    dispatch(
      fetchFriend({
        page,
        userId: '',
      })
    );
  }, [dispatch, page]);

  if (isFriendLoading) {
    return <Spinner />;
  }

  return (
    <section className="friends-list">
      <CustomHelmet pageTitle="Список друзей" />
      <div className="container">
        <div className="friends-list__wrapper">
          <BackButton baseClassName="friends-list__back" />
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
          </div>
          <ul className="friends-list__list">
            {friend.entities.map((userItem) => {
              const isFriendCoach = userItem.role === UserRole.Coach;
              const trainingStatus = getTrainingStatus(
                isFriendCoach,
                userItem.readyForTraining
              );
              return (
                <li
                  className="friends-list__item"
                  key={`friends-list__item-${userItem.id ?? ''}`}
                >
                  <div className="thumbnail-friend">
                    <div
                      className={`thumbnail-friend__info ${
                        isFriendCoach
                          ? 'thumbnail-friend__info--theme-dark'
                          : 'thumbnail-friend__info--theme-light'
                      } `}
                    >
                      <Link to={`${AppRoute.UserCard}/${userItem.id ?? ''}`}>
                        <div className="thumbnail-friend__image-status">
                          <div className="thumbnail-friend__image">
                            <picture>
                              <img
                                src={userItem.avatar}
                                width="78"
                                height="78"
                                alt=""
                              />
                            </picture>
                          </div>
                        </div>
                        <div className="thumbnail-friend__header">
                          <h2 className="thumbnail-friend__name">
                            {userItem.name}
                          </h2>
                          <div className="thumbnail-friend__location">
                            <svg width="14" height="16" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <address className="thumbnail-friend__location-address">
                              {userItem.location}
                            </address>
                          </div>
                        </div>
                      </Link>
                      <ul className="thumbnail-friend__training-types-list">
                        {userItem.trainingType
                          .slice(0, VISUAL_HASHTAG_COUNT)
                          .map((hashtag) => (
                            <li
                              className="thumbnail-user__hashtags-item"
                              key={`hashtag-${hashtag}`}
                            >
                              <div className="hashtag thumbnail-friend__hashtag">
                                <span>#{hashtag}</span>
                              </div>
                            </li>
                          ))}
                      </ul>
                      <div className="thumbnail-friend__activity-bar">
                        <div
                          className={`thumbnail-friend__ready-status ${
                            userItem.readyForTraining
                              ? 'thumbnail-friend__ready-status--is-ready'
                              : 'thumbnail-friend__ready-status--is-not-ready'
                          }
                        `}
                        >
                          <span>{trainingStatus}</span>
                        </div>
                        {!isFriendCoach && (
                          <button
                            className="thumbnail-friend__invite-button is-disabled"
                            type="button"
                          >
                            <svg
                              width="43"
                              height="46"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <use xlinkHref="#icon-invite"></use>
                            </svg>
                            <span className="visually-hidden">
                              Пригласить друга на совместную тренировку
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user visually-hidden">
                      <p className="thumbnail-friend__request-text">
                        Запрос на совместную тренировку
                      </p>
                      <div className="thumbnail-friend__button-wrapper">
                        <button
                          className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                          type="button"
                        >
                          Принять
                        </button>
                        <button
                          className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                          type="button"
                        >
                          Отклонить
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="show-more friends-list__show-more">
            {friend && page && friend.totalPages > page ? (
              <button
                className="btn show-more__button show-more__button--more"
                type="button"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Показать еще
              </button>
            ) : (
              <button
                className="btn show-more__button"
                type="button"
                onClick={scrollToTop}
              >
                Вернуться в начало
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Friends;
