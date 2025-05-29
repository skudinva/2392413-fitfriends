import { Link } from 'react-router-dom';
import { TRAINING_TYPE } from '../../const';
import { UserRdo } from '../../types/shared';

interface UserCardContentProps {
  userCardInfo: UserRdo;
  baseClass: string;
  isCoach: boolean;
}

function getTrainingStatus(isCoach: boolean, readyForTraining: boolean) {
  if (isCoach && readyForTraining) {
    return 'Готов тренировать';
  } else if (isCoach && !readyForTraining) {
    return 'Не готов тренировать';
  } else if (!isCoach && readyForTraining) {
    return 'Готов к тренировке';
  } else if (!isCoach && !readyForTraining) {
    return 'Не готов к тренировке';
  }
}

function UserCardContent({
  userCardInfo,
  baseClass,
  isCoach,
}: UserCardContentProps): JSX.Element {
  const { readyForTraining } = userCardInfo;
  const trainingStatus = getTrainingStatus(isCoach, readyForTraining);
  const trainingStatusClass = readyForTraining
    ? 'user-card-coach__status user-card-coach__status--check'
    : 'user-card-coach-2__status user-card-coach-2__status--check';

  return (
    <>
      <div className={`${baseClass}__content`}>
        <div className={`${baseClass}__head`}>
          <h2 className={`${baseClass}__title`}>{userCardInfo.name}</h2>
        </div>
        <div className={`${baseClass}__label`}>
          <Link to="#">
            <svg
              className={`${baseClass}__icon-location`}
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{userCardInfo.location}</span>
          </Link>
        </div>

        {isCoach ? (
          <div className={`${baseClass}__status-container`}>
            <div className={`${baseClass}__status ${baseClass}__status--tag`}>
              <svg
                className={`${baseClass}__icon-cup`}
                width="12"
                height="13"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-cup"></use>
              </svg>
              <span>{isCoach ? 'Тренер' : 'Спортсмен'}</span>
            </div>
            <div className={trainingStatusClass}>
              <span>{trainingStatus}</span>
            </div>
          </div>
        ) : (
          <div className={trainingStatusClass}>
            <span>{trainingStatus}</span>
          </div>
        )}

        <div className={`${baseClass}__text`}>
          <p>{userCardInfo.description}</p>
        </div>
        {isCoach && (
          <button
            className={`${baseClass}__sertificate btn-flat is-disabled`}
            type="button"
          >
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"></use>
            </svg>
            <span>Посмотреть сертификаты</span>
          </button>
        )}
        <ul className={`${baseClass}__hashtag-list`}>
          {TRAINING_TYPE.map((trainingType) => (
            <li className={`${baseClass}__hashtag-item`} key={trainingType}>
              <div className="hashtag">
                <span>#{trainingType}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className={`${baseClass}__btn btn is-disabled`} type="button">
          Добавить в друзья
        </button>
      </div>
      <div className={`${baseClass}__gallary`}>
        <ul className={`${baseClass}__gallary-list`}>
          <li className={`${baseClass}__gallary-item`}>
            <img
              src={`img/content/${
                isCoach ? 'user-coach-photo1.jpg' : 'user-card-photo1.jpg'
              }`}
              srcSet={`img/content/${
                isCoach ? 'user-coach-photo1@2x.jpg' : 'user-card-photo1@2x.jpg'
              } 2x`}
              width="334"
              height="573"
              alt="photo1"
            />
          </li>
          <li className={`${baseClass}__gallary-item`}>
            <img
              src={`img/content/${
                isCoach ? 'user-coach-photo2.jpg' : 'user-card-photo2.jpg'
              }`}
              srcSet={`img/content/${
                isCoach ? 'user-coach-photo2@2x.jpg' : 'user-card-photo2@2x.jpg'
              } 2x`}
              width="334"
              height="573"
              alt="photo2"
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default UserCardContent;
