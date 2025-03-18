import { FormEvent, useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import history from '../../history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginUser } from '../../store/user-action';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { LoginUserDto } from '../../types/shared';

function LoginForm(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      history.push(AppRoute.Root);
    }
  }, [authorizationStatus]);

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
  );
}

export default LoginForm;
