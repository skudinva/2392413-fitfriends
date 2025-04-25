import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import Spinner from '../../components/spinner/spinner';
import ThumbnailTrainingCard from '../../components/thumbnail-training-card/thumbnail-training-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders } from '../../store/order-action';
import {
  getIsUserOrderLoading,
  getUserOrder,
} from '../../store/site-data/selectors';
import { SortDirection, SortType } from '../../types/shared';

function Orders(): JSX.Element {
  const dispatch = useAppDispatch();
  const isUserOrderLoading = useAppSelector(getIsUserOrderLoading);
  const userOrder = useAppSelector(getUserOrder);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(SortType.Amount);
  const [sortDirection, setSortDirection] = useState(SortDirection.Desc);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const onSortingButtonClick = (sortField: SortType) => {
    if (sortBy === sortField) {
      setSortDirection(
        sortDirection === SortDirection.Asc
          ? SortDirection.Desc
          : SortDirection.Asc
      );
      return;
    }
    setSortBy(sortField);
  };

  useEffect(() => {
    dispatch(
      fetchOrders({
        page,
        sortDirection,
        sortBy,
        userId: '',
      })
    );
  }, [dispatch, page, sortBy, sortDirection]);

  return (
    <section className="my-orders">
      <CustomHelmet pageTitle="Мои заказы" />
      <div className="container">
        <div className="my-orders__wrapper">
          <BackButton baseClassName="btn-flat--underlined my-orders__back" />
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <div className="sort-for">
              <p>Сортировать по:</p>
              <div className="sort-for__btn-container">
                <button
                  className="btn-filter-sort"
                  type="button"
                  onClick={() => {
                    onSortingButtonClick(SortType.TotalPrice);
                  }}
                >
                  <span>Сумме</span>
                  <svg width="16" height="10" aria-hidden="true">
                    <use
                      xlinkHref={
                        sortDirection === SortDirection.Desc
                          ? '#icon-sort-up'
                          : '#icon-sort-down'
                      }
                    />
                  </svg>
                </button>
                <button
                  className="btn-filter-sort"
                  type="button"
                  onClick={() => {
                    onSortingButtonClick(SortType.Amount);
                  }}
                >
                  <span>Количеству</span>
                  <svg width="16" height="10" aria-hidden="true">
                    <use
                      xlinkHref={
                        sortDirection === SortDirection.Desc
                          ? '#icon-sort-up'
                          : '#icon-sort-down'
                      }
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isUserOrderLoading || !userOrder ? (
            <Spinner />
          ) : (
            <>
              <ul className="my-orders__list">
                {userOrder.entities.map((order) => (
                  <li
                    className="my-orders__item"
                    key={`my-orders__item-${order.id}`}
                  >
                    <ThumbnailTrainingCard
                      training={order.training}
                      detailButtonStyle="detail"
                      totalInfo={order}
                    />
                  </li>
                ))}
              </ul>
              <div className="show-more my-orders__show-more">
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
