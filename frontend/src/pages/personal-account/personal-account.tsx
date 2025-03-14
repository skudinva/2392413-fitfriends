import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import Spinner from '../../components/spinner/spinner';
import UserInfoForm from '../../components/user-info-form/user-info-form';
import { useAppSelector } from '../../hooks';
import {
  getUserInfo,
  getUserInfoLoading,
} from '../../store/user-process/selectors';

function PersonalAccount(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const userInfoLoading = useAppSelector(getUserInfoLoading);

  if (userInfoLoading) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <section className="user-info">
            <div className="user-info__header">
              <div className="input-load-avatar">
                <label>
                  <input
                    className="visually-hidden"
                    type="file"
                    name="user-photo-1"
                    accept="image/png, image/jpeg"
                  />
                  <span className="input-load-avatar__avatar">
                    <img
                      src={userInfo?.avatar}
                      srcSet={userInfo?.avatar && `${userInfo.avatar} 2x`}
                      width="98"
                      height="98"
                      alt="user photo"
                    />
                  </span>
                </label>
              </div>
              <div className="user-info-edit__controls">
                <button
                  className="user-info-edit__control-btn"
                  aria-label="обновить"
                >
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-change"></use>
                  </svg>
                </button>
                <button
                  className="user-info-edit__control-btn"
                  aria-label="удалить"
                >
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            </div>
            <UserInfoForm />
          </section>
          <div className="inner-page__content">
            <PersonalAccountUser />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalAccount;
