import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import PopularTrainingCard from '../../components/popular-training-card/popular-training-card';
import Spinner from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsUserOrderLoading,
  getUserOrder,
} from '../../store/site-data/selectors';
import { fetchOrders } from '../../store/training-action';

function Purchases(): JSX.Element {
  const dispatch = useAppDispatch();
  const isUserOrderLoading = useAppSelector(getIsUserOrderLoading);
  const userOrder = useAppSelector(getUserOrder);

  const [page, setPage] = useState(1);
  const [activeOnly, setActiveOnly] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    dispatch(fetchOrders({ page, activeOnly }));
  }, [activeOnly, dispatch, page]);

  if (isUserOrderLoading || !userOrder) {
    return <Spinner />;
  }

  return (
    <section className="my-purchases">
      <CustomHelmet pageTitle="Мои покупки" />
      <div className="container">
        <div className="my-purchases__wrapper">
          <BackButton baseClassName="my-purchases__back" />
          <div className="my-purchases__title-wrapper">
            <h1 className="my-purchases__title">Мои покупки</h1>
            <div className="my-purchases__controls">
              <div
                className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                data-validate-type="checkbox"
              >
                <label>
                  <input
                    type="checkbox"
                    value="user-agreement-1"
                    name="user-agreement"
                    checked={activeOnly}
                    onClick={() => setActiveOnly(!activeOnly)}
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Только активные</span>
                </label>
              </div>
            </div>
          </div>
          <ul className="my-purchases__list">
            {userOrder.entities.map((order) => (
              <li
                className="my-purchases__item"
                key={`my-purchases__item-${order.id}`}
              >
                <PopularTrainingCard training={order.training} />
              </li>
            ))}
          </ul>
          <div className="show-more my-purchases__show-more">
            {userOrder && page && userOrder.totalPages > page ? (
              <button
                className="btn show-more__button show-more__button--more"
                type="button"
                onClick={() => {
                  setPage(page + 1);
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
        </div>
      </div>
    </section>
  );
}

export default Purchases;
