import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import GymCatalogForm from '../../components/gym-catalog-form/gym-catalog-form';
import Spinner from '../../components/spinner/spinner';
import ThumbnailTrainingCard from '../../components/thumbnail-training-card/thumbnail-training-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsTrainingLoading,
  getTraining,
} from '../../store/site-data/selectors';
import { fetchTrainings } from '../../store/training-action';
import { EntityConstrain, TrainingQuery } from '../../types/shared';

function MyTrainings() {
  const dispatch = useAppDispatch();

  const trainingLoading = useAppSelector(getIsTrainingLoading);
  const training = useAppSelector(getTraining);

  const [filterParam, setFilterParam] = useState<TrainingQuery>({
    minPrice: 0,
    maxPrice: training.maxPrice,
    minCalories: EntityConstrain.training.calories.minValue,
    maxCalories: EntityConstrain.training.calories.maxValue,
    minRating: 0,
    maxRating: EntityConstrain.feedback.mark.maxValue,
    types: [],
    durations: [],
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

    dispatch(fetchTrainings(filterParam));
  }, [dispatch, filterParam]);

  if (training.itemsPerPage === 0) {
    return <Spinner />;
  }

  return (
    <section className="inner-page">
      <CustomHelmet pageTitle="Мои тренировки" />
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <div className="my-training-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="my-training-form__wrapper">
              <BackButton baseClassName="btn-flat--underlined my-training-form__btnback" />
              <h3 className="my-training-form__title">фильтры</h3>
              <GymCatalogForm
                handleFilterApply={setFilterParam}
                maxPriceTraining={training.maxPrice}
                includeType={false}
                includeSort={false}
                includeDuration
              />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="my-trainings">
              {trainingLoading ? (
                <Spinner />
              ) : (
                <>
                  <ul className="my-trainings__list">
                    {training &&
                      training.entities.map((trainingItem) => (
                        <li
                          className="my-trainings__item"
                          key={`my-trainings__item-${trainingItem.id}`}
                        >
                          <ThumbnailTrainingCard
                            training={trainingItem}
                            detailButtonStyle="comments-and-detail"
                          />
                        </li>
                      ))}
                  </ul>
                  <div className="show-more training-catalog__show-more">
                    {training && page && training.totalPages > page ? (
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

export default MyTrainings;
