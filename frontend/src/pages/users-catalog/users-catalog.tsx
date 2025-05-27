import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import LookForCompanyCard from '../../components/look-for-company-card/look-for-company-card';
import Spinner from '../../components/spinner/spinner';
import UserCatalogForm from '../../components/user-catalog-form/user-catalog-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsUserCatalogLoading,
  getUserCatalog,
} from '../../store/site-data/selectors';
import { fetchUserCatalog } from '../../store/training-action';
import { TrainingLevel, UserQuery } from '../../types/shared';

function UsersCatalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const userCatalogLoading = useAppSelector(getIsUserCatalogLoading);
  const userCatalog = useAppSelector(getUserCatalog);
  const [filterParam, setFilterParam] = useState<UserQuery>({
    types: [],
    locations: [],
    trainingLevel: TrainingLevel.Beginner,
    page: 1,
  });
  const { page } = filterParam;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!filterParam) {
      return;
    }

    dispatch(fetchUserCatalog(filterParam));
  }, [dispatch, filterParam]);

  if (userCatalog.itemsPerPage === 0) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <CustomHelmet pageTitle="Каталог пользователей" />
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>
          <div className="user-catalog-form">
            <h2 className="visually-hidden">Каталог пользователя</h2>
            <div className="user-catalog-form__wrapper">
              <BackButton baseClassName="btn-flat btn-flat--underlined user-catalog-form__btnback" />
              <h3 className="user-catalog-form__title">Фильтры</h3>
              <UserCatalogForm handleFilterApply={setFilterParam} />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="users-catalog">
              {userCatalogLoading ? (
                <Spinner />
              ) : (
                <>
                  <ul className="users-catalog__list">
                    {userCatalog &&
                      userCatalog.entities.map((userItem) => (
                        <li
                          className="users-catalog__item"
                          key={`users-catalog__item-${userItem.id ?? ''}`}
                        >
                          <LookForCompanyCard
                            style="light"
                            userInfo={{
                              id: userItem.id ?? '',
                              name: userItem.name,
                              location: userItem.location,
                              hashtags: userItem.trainingType,
                              avatar: userItem.avatar ?? '',
                              role: userItem.role,
                            }}
                          />
                        </li>
                      ))}
                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {userCatalog && page && userCatalog.totalPages > page ? (
                      <button
                        className="btn show-more__button show-more__button--more"
                        type="button"
                        onClick={() => {
                          if (!filterParam) {
                            return;
                          }
                          setFilterParam({
                            ...filterParam,
                            page: page + 1,
                          });
                        }}
                      >
                        Показать еще
                      </button>
                    ) : (
                      <button
                        className="btn show-more__button"
                        type="button"
                        onClick={scrollToTop}
                      >
                        Вернуться в начало
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersCatalog;
