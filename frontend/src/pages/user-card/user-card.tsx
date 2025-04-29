import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import Spinner from '../../components/spinner/spinner';
import { TRAINING_TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUserCardInfo } from '../../store/user-action';
import {
  getIsUserCardInfoLoading,
  getUserCardInfo,
} from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';
import UserCardTraining from '../user-card-training/user-card-training';

function UserCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const userCardInfo = useAppSelector(getUserCardInfo);
  const isUserCardInfoLoading = useAppSelector(getIsUserCardInfoLoading);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserCardInfo(userId));
    }
  }, [dispatch, userId]);

  if (isUserCardInfoLoading || !userCardInfo) {
    return <Spinner />;
  }

  return (
    <div className="inner-page inner-page--no-sidebar">
      <CustomHelmet pageTitle="Карточка пользователя" />
      <div className="container">
        <div className="inner-page__wrapper">
          <BackButton baseClassName="inner-page__back" />
          <div className="inner-page__content">
            <section className="user-card-coach">
              <h1 className="visually-hidden">
                Карточка пользователя роль тренер
              </h1>
              <div className="user-card-coach__wrapper">
                <div className="user-card-coach__card">
                  <div className="user-card-coach__content">
                    <div className="user-card-coach__head">
                      <h2 className="user-card-coach__title">
                        {userCardInfo.name}
                      </h2>
                    </div>
                    <div className="user-card-coach__label">
                      <Link to="#">
                        <svg
                          className="user-card-coach__icon-location"
                          width="12"
                          height="14"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>{userCardInfo.location}</span>
                      </Link>
                    </div>
                    <div className="user-card-coach__status-container">
                      <div className="user-card-coach__status user-card-coach__status--tag">
                        <svg
                          className="user-card-coach__icon-cup"
                          width="12"
                          height="13"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-cup"></use>
                        </svg>
                        <span>
                          {userCardInfo.role === UserRole.Coach
                            ? 'Тренер'
                            : 'Спортсмен'}
                        </span>
                      </div>
                      <div className="user-card-coach__status user-card-coach__status--check">
                        <span>Готов тренировать</span>
                      </div>
                    </div>
                    <div className="user-card-coach__text">
                      <p>{userCardInfo.description}</p>
                    </div>
                    <button
                      className="btn-flat user-card-coach__sertificate is-disabled"
                      type="button"
                    >
                      <svg width="12" height="13" aria-hidden="true">
                        <use xlinkHref="#icon-teacher"></use>
                      </svg>
                      <span>Посмотреть сертификаты</span>
                    </button>
                    <ul className="user-card-coach__hashtag-list">
                      {TRAINING_TYPE.map((trainingType) => (
                        <li
                          className="user-card-coach__hashtag-item"
                          key={trainingType}
                        >
                          <div className="hashtag">
                            <span>#{trainingType}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn user-card-coach__btn is-disabled"
                      type="button"
                    >
                      Добавить в друзья
                    </button>
                  </div>
                  <div className="user-card-coach__gallary">
                    <ul className="user-card-coach__gallary-list">
                      <li className="user-card-coach__gallary-item">
                        <img
                          src="img/content/user-coach-photo1.jpg"
                          srcSet="img/content/user-coach-photo1@2x.jpg 2x"
                          width="334"
                          height="573"
                          alt="photo1"
                        />
                      </li>
                      <li className="user-card-coach__gallary-item">
                        <img
                          src="img/content/user-coach-photo2.jpg"
                          srcSet="img/content/user-coach-photo2@2x.jpg 2x"
                          width="334"
                          height="573"
                          alt="photo2"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="user-card-coach__training">
                  <UserCardTraining />
                  <form className="user-card-coach__training-form is-disabled">
                    <button
                      className="btn user-card-coach__btn-training"
                      type="button"
                    >
                      Хочу персональную тренировку
                    </button>
                    <div className="user-card-coach__training-check">
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="user-agreement-1"
                            name="user-agreement"
                          />
                          <span className="custom-toggle__icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="custom-toggle__label">
                            Получать уведомление на почту о новой тренировке
                          </span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
