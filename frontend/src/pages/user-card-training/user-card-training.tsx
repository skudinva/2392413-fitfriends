import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner/spinner';
import ThumbnailTrainingCard from '../../components/thumbnail-training-card/thumbnail-training-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getCoachTraining,
  getIsCoachTrainingLoading,
} from '../../store/site-data/selectors';
import { fetchCoachTraining } from '../../store/training-action';

function UserCardTraining(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const isCoachTrainingLoading = useAppSelector(getIsCoachTrainingLoading);
  const coachTraining = useAppSelector(getCoachTraining);

  const sliderRef = useRef<SwiperRef>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCoachTraining(userId));
    }
  }, [dispatch, userId]);

  if (isCoachTrainingLoading || !coachTraining) {
    return <Spinner />;
  }

  return (
    <>
      <div className="user-card-coach__training-head">
        <h2 className="user-card-coach__training-title">Тренировки</h2>
        <div className="user-card-coach__training-bts">
          <button
            className="btn-icon user-card-coach__training-btn"
            type="button"
            aria-label="back"
            ref={prevButtonRef}
            onClick={() => sliderRef.current?.swiper.slidePrev()}
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-left"></use>
            </svg>
          </button>
          <button
            className="btn-icon user-card-coach__training-btn"
            type="button"
            aria-label="next"
            ref={nextButtonRef}
            onClick={() => sliderRef.current?.swiper.slideNext()}
          >
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        className="user-card-coach__training-list"
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
        {coachTraining.entities.map((trainingItem) => (
          <SwiperSlide
            key={`SwiperSlide-${trainingItem.id}`}
            className="special-for-you__item"
          >
            <li
              className="user-card-coach__training-item"
              key={`user-card-coach__training-item-${trainingItem.id}`}
            >
              <ThumbnailTrainingCard
                training={trainingItem}
                detailButtonStyle="comments-and-detail"
              />
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default UserCardTraining;
