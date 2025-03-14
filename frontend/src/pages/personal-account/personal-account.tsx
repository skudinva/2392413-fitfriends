import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import Spinner from '../../components/spinner/spinner';
import UserInfoForm from '../../components/user-info-form/user-info-form';
import { useAppSelector } from '../../hooks';
import { getUserInfoLoading } from '../../store/user-process/selectors';

function PersonalAccount(): JSX.Element {
  const userInfoLoading = useAppSelector(getUserInfoLoading);

  if (userInfoLoading) {
    return <Spinner />;
  }
  return (
    <section className="inner-page">
      <CustomHelmet pageTitle="Личный кабинет" />
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <section className="user-info">
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
