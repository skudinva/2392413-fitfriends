import { useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import GymCatalogForm from '../../components/gym-catalog-form/gym-catalog-form';
import PopularTrainingCard from '../../components/popular-training-card/popular-training-card';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks';
import {
  getIsTrainingLoading,
  getTraining,
} from '../../store/site-data/selectors';

function Trainings(): JSX.Element {
  const trainingLoading = useAppSelector(getIsTrainingLoading);
  const training = useAppSelector(getTraining);
  const [page, setPage] = useState<number>(training?.currentPage ?? 1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="inner-page">
      <CustomHelmet pageTitle="Мои тренировки" />
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <div className="gym-catalog-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="gym-catalog-form__wrapper">
              <BackButton baseClassName="btn-flat--underlined gym-catalog-form__btnback" />
              <h3 className="gym-catalog-form__title">Фильтры</h3>
              <GymCatalogForm page={page} />
            </div>
          </div>
          <div className="training-catalog">
            {trainingLoading ? (
              <Spinner />
            ) : (
              <>
                <ul className="training-catalog__list">
                  {training &&
                    training.entities.map((trainingItem) => (
                      <li
                        className="training-catalog__item"
                        key={`training-catalog__item-${trainingItem.id}`}
                      >
                        <PopularTrainingCard training={trainingItem} />
                      </li>
                    ))}
                </ul>
                <div className="show-more training-catalog__show-more">
                  {training && training.totalPages > page ? (
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                      onClick={() => setPage(page + 1)}
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
    </section>
  );
}

export default Trainings;
