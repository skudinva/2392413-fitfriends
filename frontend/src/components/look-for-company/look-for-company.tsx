import { useRef } from 'react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { AppRoute } from '../../const';
import history from '../../history';
import { useAppSelector } from '../../hooks';
import {
  getIsUserCompanyLoading,
  getUserCompany,
} from '../../store/user-process/selectors';
import LookForCompanyCard from '../look-for-company-card/look-for-company-card';
import NoDataFound from '../no-data-found/no-data-found';
import Spinner from '../spinner/spinner';

function LookForCompany(): JSX.Element {
  const userCompany = useAppSelector(getUserCompany);
  const isUserCompanyLoading = useAppSelector(getIsUserCompanyLoading);

  const sliderRef = useRef<SwiperRef>(null);

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="container">
      <div className="look-for-company__wrapper">
        {isUserCompanyLoading || !userCompany ? (
          <Spinner />
        ) : (
          <>
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

            {userCompany.entities.length ? (
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
                {userCompany.entities.map((userInfo) => (
                  <SwiperSlide
                    key={`SwiperSlide-${userInfo.id ?? ''}`}
                    className="special-for-you__item"
                  >
                    <li className="look-for-company__item">
                      <LookForCompanyCard
                        style="dark"
                        userInfo={{
                          id: userInfo.id ?? '',
                          avatar: userInfo.avatar ?? '',
                          hashtags: userInfo.trainingType,
                          location: userInfo.location,
                          name: userInfo.name,
                          role: userInfo.role,
                        }}
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

export default LookForCompany;
