import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks';
import {
  getUserInfo,
  getUserInfoLoading,
} from '../../store/user-process/selectors';

function UserInfoHeader(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const userInfoLoading = useAppSelector(getUserInfoLoading);

  if (userInfoLoading) {
    return <Spinner />;
  }

  return (
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
        <button className="user-info-edit__control-btn" aria-label="обновить">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-change"></use>
          </svg>
        </button>
        <button className="user-info-edit__control-btn" aria-label="удалить">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-trash"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default UserInfoHeader;
