import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import SpecialForYouCard from '../../components/special-for-you-card/special-for-you-card';
import Spinner from '../../components/spinner/spinner';
import { useAppSelector } from '../../hooks';
import {
  getIsSpecialTrainingLoading,
  getSpecialTraining,
} from '../../store/site-data/selectors';

function SpecialForYou(): JSX.Element {
  const isSpecialTrainingLoading = useAppSelector(getIsSpecialTrainingLoading);
  const specialTraining = useAppSelector(getSpecialTraining);

  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="special-for-you__wrapper">
        {isSpecialTrainingLoading || !specialTraining ? (
          <Spinner />
        ) : (
          <>
            <div className="special-for-you__title-wrapper">
              <h2 className="special-for-you__title">
                Специально подобрано для вас
              </h2>
              <div className="special-for-you__controls">
                <button
                  className="btn-icon special-for-you__control prev-slide-button"
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
                  className="btn-icon special-for-you__control next-slide-button"
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
            <Swiper
              slidesPerView={3}
              className="special-for-you__list"
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
              {specialTraining.entities.map((trainingItem) => (
                <SwiperSlide
                  key={`SwiperSlide-${trainingItem.id}`}
                  className="special-for-you__item"
                >
                  <SpecialForYouCard
                    training={trainingItem}
                    key={`special-for-you__item-${trainingItem.id}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
}

export default SpecialForYou;
