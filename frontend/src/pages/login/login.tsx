import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import LoginForm from '../../components/login-form/login-form';

function Login(): JSX.Element {
  return (
    <>
      <CustomHelmet pageTitle="Войти" />
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
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
