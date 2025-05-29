import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import Spinner from '../../components/spinner/spinner';
import UserCardContent from '../../components/user-card-content/user-card-content';
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

  const isCoach = userCardInfo?.role === UserRole.Coach;
  const baseClass = (isCoach ? 'user-card-coach' : 'user-card').concat(
    !isCoach || userCardInfo?.readyForTraining ? '' : '-2'
  );

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
            <section className={baseClass}>
              <h1 className="visually-hidden">Карточка пользователя</h1>
              <div className={`${baseClass}__wrapper`}>
                {isCoach ? (
                  <>
                    <div className={`${baseClass}__card`}>
                      <UserCardContent
                        userCardInfo={userCardInfo}
                        baseClass={baseClass}
                        isCoach={isCoach}
                      />
                    </div>
                    <div className={`${baseClass}__training`}>
                      <UserCardTraining />
                      <form
                        className={`${baseClass}__training-form is-disabled`}
                      >
                        <button
                          className={`${baseClass}__btn-training btn`}
                          type="button"
                        >
                          Хочу персональную тренировку
                        </button>

                        <div className={`${baseClass}__training-check`}>
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                value="user-agreement-1"
                                name="user-agreement"
                                disabled
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
                  </>
                ) : (
                  <UserCardContent
                    userCardInfo={userCardInfo}
                    baseClass={baseClass}
                    isCoach={isCoach}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
