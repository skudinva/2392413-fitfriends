import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { AppRoute } from '../../const';
import history from '../../history';
import { LOCATIONS, TrainingType, UserRole } from '../../types/shared';
import LookForCompanyCard from '../look-for-company-card/look-for-company-card';

const mockData = [
  {
    id: '63f4567890abcdef1234567b',
    name: 'ДмитрийКозлов',
    location: LOCATIONS[1],
    hashtags: [TrainingType.Pilates],
    avatar: 'img/content/thumbnails/user-04.jpg',
    role: UserRole.Sportsman,
  },
  {
    id: '63f4567890abcdef1234567c',
    name: 'ОльгаВасильева',
    location: LOCATIONS[2],
    hashtags: [TrainingType.Boxing],
    avatar: 'img/content/thumbnails/user-05.jpg',
    role: UserRole.Sportsman,
  },
  {
    id: '63f4567890abcdef12345678',
    name: 'ВикторСилаев',
    location: LOCATIONS[3],
    hashtags: [TrainingType.Crossfit],
    avatar: 'img/content/thumbnails/user-06.jpg',
    role: UserRole.Sportsman,
  },
  {
    id: '63f4567890abcdef12345679',
    name: 'АннаГромова',
    location: LOCATIONS[4],
    hashtags: [TrainingType.Yoga],
    avatar: 'img/content/thumbnails/user-03.jpg',
    role: UserRole.Sportsman,
  },
  {
    id: '63f4567890abcdef1234567a',
    name: 'ДмитрийШторм',
    location: LOCATIONS[0],
    hashtags: [TrainingType.Running],
    avatar: 'img/content/thumbnails/user-01.jpg',
    role: UserRole.Sportsman,
  },
];

function LookForCompany(): JSX.Element {
  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="look-for-company__wrapper">
        <div className="look-for-company__title-wrapper">
          <h2 className="look-for-company__title">
            Ищут компанию для тренировки
          </h2>
          <button
            className="btn-flat btn-flat--light look-for-company__button"
            type="button"
            onClick={() => history.push(AppRoute.FindFriends)}
          >
            <span>Смотреть все</span>
            <svg width="14" height="10" aria-hidden="true">
              <use xlinkHref="#arrow-right"></use>
            </svg>
          </button>
          <div className="look-for-company__controls">
            <button
              className="btn-icon btn-icon--outlined look-for-company__control"
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
              className="btn-icon btn-icon--outlined look-for-company__control"
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
          slidesPerView={4}
          className="look-for-company__list"
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
          {mockData.map((userInfo) => (
            <SwiperSlide
              key={`SwiperSlide-${userInfo.id}`}
              className="special-for-you__item"
            >
              <li className="look-for-company__item">
                <LookForCompanyCard style="dark" userInfo={userInfo} />
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default LookForCompany;
