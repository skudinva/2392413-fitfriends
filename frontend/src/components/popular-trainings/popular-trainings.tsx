import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner/spinner';
import { AppRoute } from '../../const';
import history from '../../history';
import { useAppSelector } from '../../hooks';
import {
  getIsPopularTrainingLoading,
  getPopularTraining,
} from '../../store/site-data/selectors';
import NoDataFound from '../no-data-found/no-data-found';
import ThumbnailTrainingCard from '../thumbnail-training-card/thumbnail-training-card';

function PopularTrainings(): JSX.Element {
  const trainingLoading = useAppSelector(getIsPopularTrainingLoading);
  const training = useAppSelector(getPopularTraining);

  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="popular-trainings__wrapper">
        {trainingLoading || !training ? (
          <Spinner />
        ) : (
          <>
            <div className="popular-trainings__title-wrapper">
              <h2 className="popular-trainings__title">
                Популярные тренировки
              </h2>
              <button
                className="btn-flat popular-trainings__button"
                type="button"
                onClick={() => history.push(AppRoute.Trainings)}
              >
                <span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
              <div className="popular-trainings__controls">
                <button
                  className="btn-icon popular-trainings__control"
                  type="button"
                  aria-label="previous"
                  ref={prevButtonRef}
                  onClick={() => sliderRef.current?.swiper.slidePrev()}
                >
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                </button>
                <button
                  className="btn-icon popular-trainings__control"
                  type="button"
                  aria-label="next"
                  ref={nextButtonRef}
                  onClick={() => sliderRef.current?.swiper.slideNext()}
                >
                  <svg width="16" height="14" aria-hidden="true">
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
              </div>
            </div>
            {training.entities?.length ? (
              <Swiper
                slidesPerView={4}
                className="popular-trainings__list"
                modules={[Navigation]}
                ref={sliderRef}
                onBeforeInit={(swiper) => {
                  if (prevButtonRef.current) {
                    swiper.navigation.prevEl = prevButtonRef.current;
                  }
                  if (nextButtonRef.current) {
                    swiper.navigation.nextEl = nextButtonRef.current;
                  }
                }}
              >
                {training.entities.map((trainingItem) => (
                  <SwiperSlide
                    key={`SwiperSlide-${trainingItem.id}`}
                    className="special-for-you__item"
                  >
                    <li
                      className="popular-trainings__item"
                      key={`popular-trainings__item-${trainingItem.id}`}
                    >
                      <ThumbnailTrainingCard
                        training={trainingItem}
                        detailButtonStyle="comments-and-detail"
                      />
                    </li>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <NoDataFound />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PopularTrainings;
