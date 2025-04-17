import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import PersonalAccountCoach from '../../components/personal-account-coach/personal-account-coach';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import Spinner from '../../components/spinner/spinner';
import UserInfoForm from '../../components/user-info-form/user-info-form';
import { useAppSelector } from '../../hooks';
import {
  getUserInfo,
  getUserInfoLoading,
} from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';

function PersonalAccount(): JSX.Element {
  const userInfoLoading = useAppSelector(getUserInfoLoading);
  const userInfo = useAppSelector(getUserInfo);

  if (userInfoLoading || !userInfo) {
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
            {userInfo.role === UserRole.Sportsman && <PersonalAccountUser />}
            {userInfo.role === UserRole.Coach && <PersonalAccountCoach />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PersonalAccount;
