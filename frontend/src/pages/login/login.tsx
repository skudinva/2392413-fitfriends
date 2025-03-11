import { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { LoginUserDto } from '../../types/shared';

function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginUserDto = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
    };
    dispatch(loginUser(data));
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
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="get" onSubmit={onFormSubmit}>
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input type="email" name="email" />
                      </span>
                    </label>
                  </div>
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input type="password" name="password" />
                      </span>
                    </label>
                  </div>
                  <button className="btn sign-in__button" type="submit">
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

export default Login;
