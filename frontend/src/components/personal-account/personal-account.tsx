import { useState } from 'react';
import { DEFAULT_TRAINING_LEVEL, TRAINING_TYPE } from '../../const';
import { useAppSelector } from '../../hooks';
import {
  getUserInfo,
  getUserInfoLoading,
} from '../../store/user-process/selectors';
import { LOCATIONS, UserGender } from '../../types/shared';
import CustomSelect from '../custom-select/custom-select';
import PersonalAccountUser from '../personal-account-user/personal-account-user';
import Spinner from '../spinner/spinner';

function PersonalAccount(): JSX.Element {
  const userInfo = useAppSelector(getUserInfo);
  const userInfoLoading = useAppSelector(getUserInfoLoading);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit(false);
  };

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
            </div>
            <form
              className="user-info__form"
              action="#"
              method="post"
              onSubmit={onFormSubmit}
            >
              {isEdit ? (
                <button
                  className="btn-flat btn-flat--underlined user-info__save-button"
                  type="submit"
                  aria-label="Сохранить"
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>Сохранить</span>
                </button>
              ) : (
                <button
                  className="btn-flat btn-flat--underlined user-info__edit-button"
                  type="button"
                  aria-label="Редактировать"
                  onClick={onEditButtonClick}
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>Редактировать</span>
                </button>
              )}
              <div className="user-info__section">
                <h2 className="user-info__title">Обо мне</h2>
                <div
                  className={[
                    'custom-input',
                    isEdit
                      ? 'user-info-edit__input'
                      : 'user-info__input custom-input--readonly',
                  ].join(' ')}
                >
                  <label>
                    <span className="custom-input__label">Имя</span>
                    <span className="custom-input__wrapper">
                      <input
                        type="text"
                        name="name"
                        defaultValue={userInfo?.name}
                        disabled={!isEdit}
                      />
                    </span>
                  </label>
                </div>
                <div className="custom-textarea custom-textarea--readonly user-info__textarea">
                  <label>
                    <span className="custom-textarea__label">Описание</span>
                    <textarea
                      name="description"
                      placeholder=" "
                      disabled
                      defaultValue={userInfo?.description}
                    />
                  </label>
                </div>
              </div>
              <div className="user-info__section user-info__section--status">
                <h2 className="user-info__title user-info__title--status">
                  Статус
                </h2>
                <div className="custom-toggle custom-toggle--switch user-info__toggle">
                  <label>
                    <input
                      type="checkbox"
                      name="ready-for-training"
                      defaultChecked
                      disabled
                    />
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      Готов тренировать
                    </span>
                  </label>
                </div>
              </div>
              <div className="user-info__section">
                <h2 className="user-info__title user-info__title--specialization">
                  Специализация
                </h2>
                <div className="specialization-checkbox user-info__specialization">
                  {TRAINING_TYPE.map((trainingType) => (
                    <div className="btn-checkbox" key={trainingType}>
                      <label>
                        <input
                          className="visually-hidden"
                          type="checkbox"
                          name="specialization"
                          value={trainingType}
                          defaultChecked
                          disabled
                        />
                        <span className="btn-checkbox__btn">
                          {trainingType}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <CustomSelect
                isEdit={isEdit}
                labelText={'Локация'}
                selectValues={[...LOCATIONS]}
                containerClassName="user-info"
                defaultValue={String(userInfo?.location || '')}
                placeholderPrefix={!isEdit ? 'ст. м. ' : ''}
              />
              <CustomSelect
                isEdit={isEdit}
                labelText={'Пол'}
                selectValues={Object.values(UserGender)}
                containerClassName="user-info"
                defaultValue={String(userInfo?.gender || '')}
              />
              <div className="custom-select--readonly custom-select user-info__select">
                <span className="custom-select__label">Уровень</span>
                <div className="custom-select__placeholder">
                  {DEFAULT_TRAINING_LEVEL}
                </div>
                <button
                  className="custom-select__button"
                  type="button"
                  aria-label="Выберите одну из опций"
                  disabled
                >
                  <span className="custom-select__text"></span>
                  <span className="custom-select__icon">
                    <svg width="15" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-down"></use>
                    </svg>
                  </span>
                </button>
                <ul className="custom-select__list" role="listbox"></ul>
              </div>
            </form>
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
