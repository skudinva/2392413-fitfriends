import { FormEvent, useState } from 'react';
import { LOCATIONS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/action';
import { UserGender } from '../../types/shared';
import { LocationName } from '../../types/types';

function Registration(): JSX.Element {
  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const onArrowButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const [location, setLocation] = useState<LocationName>();
  const onLocationClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    setLocation(evt.currentTarget.innerText as LocationName);
    setIsOpened(false);
  };

  const [agreementChecked, setAgreementChecked] = useState<boolean>(false);
  const onAgreementChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAgreementChecked(evt.currentTarget.checked);
  };

  const [avatar, setAvatar] = useState<File>();
  const onAvatarUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('gender', formData.get('sex')?.toString() || '');
    formData.append('location', String(location));
    dispatch(registerUser(formData));
  };

  return (
    <>
      <div className="background-logo">
        <svg
          className="background-logo__logo"
          width="750"
          height="284"
          aria-hidden="true"
        >
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg
          className="background-logo__icon"
          width="343"
          height="343"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={onFormSubmit}>
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input
                          className="visually-hidden"
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={onAvatarUpload}
                        />
                        <span className="input-load-avatar__btn">
                          {avatar ? (
                            <img
                              src={URL.createObjectURL(avatar)}
                              className="input-load-avatar__btn"
                            />
                          ) : (
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          )}
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">
                        Загрузите фото профиля
                      </h2>
                      <span className="sign-up__text">
                        JPG, PNG, оптимальный размер 100×100&nbsp;px
                      </span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">
                          Дата рождения
                        </span>
                        <span className="custom-input__wrapper">
                          <input type="date" name="birthday" max="2099-12-31" />
                        </span>
                      </label>
                    </div>
                    <div
                      className={`custom-select not-empty ${
                        isOpened ? 'is-open' : 'custom-select--not-selected'
                      }`}
                    >
                      <span className="custom-select__label">Ваша локация</span>
                      <button
                        className="custom-select__button"
                        type="button"
                        aria-label="Выберите одну из опций"
                        onClick={onArrowButtonClick}
                      >
                        <span className="custom-select__text">{location}</span>
                        <span className="custom-select__icon">
                          <svg width="15" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-down"></use>
                          </svg>
                        </span>
                      </button>

                      <ul className="custom-select__list" role="listbox">
                        {LOCATIONS.map((locationItem) => (
                          <li
                            key={locationItem}
                            role="option"
                            className="custom-select__item"
                            aria-selected={locationItem === location}
                            onClick={onLocationClick}
                          >
                            {locationItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            autoComplete="off"
                          />
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__radio">
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        {Object.values(UserGender).map((sex, index) => (
                          <div
                            className="custom-toggle-radio__block"
                            key={`sex-${index.toString()}`}
                          >
                            <label>
                              <input type="radio" name="sex" value={sex} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                {sex}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      <div className="role-btn">
                        <label>
                          <input
                            className="visually-hidden"
                            type="radio"
                            name="role"
                            value="coach"
                            disabled
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup"></use>
                            </svg>
                          </span>
                          <span className="role-btn__btn">
                            Я хочу тренировать
                          </span>
                        </label>
                      </div>
                      <div className="role-btn">
                        <label>
                          <input
                            className="visually-hidden"
                            type="radio"
                            name="role"
                            value="sportsman"
                            defaultChecked
                          />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-weight"></use>
                            </svg>
                          </span>
                          <span className="role-btn__btn">
                            Я хочу тренироваться
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement"
                        name="user-agreement"
                        required
                        onChange={onAgreementChange}
                        defaultChecked={agreementChecked}
                      />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">
                        Я соглашаюсь с <span>политикой конфиденциальности</span>{' '}
                        компании
                      </span>
                    </label>
                  </div>
                  <button className="btn sign-up__button" type="submit">
                    Продолжить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Registration;
