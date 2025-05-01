import { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/user-action';
import { LoginUserDto } from '../../types/shared';

function LoginForm(): JSX.Element {
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
    <form method="get" onSubmit={onFormSubmit}>
      <div className="sign-in">
        <div className="custom-input sign-in__input">
          <label>
            <span className="custom-input__label">E-mail</span>
            <span className="custom-input__wrapper">
              <input
                type="email"
                name="email"
                autoComplete="off"
                data-testid="mail"
                required
              />
            </span>
          </label>
        </div>
        <div className="custom-input sign-in__input">
          <label>
            <span className="custom-input__label">Пароль</span>
            <span className="custom-input__wrapper">
              <input
                type="password"
                name="password"
                autoComplete="off"
                required
              />
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
