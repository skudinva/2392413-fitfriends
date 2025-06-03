import { useRef } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks';
import {
  getDiscountTraining,
  getIsDiscountTrainingLoading,
} from '../../store/site-data/selectors';
import NoDataFound from '../no-data-found/no-data-found';
import SpecialOfferCard from '../special-offer-card/special-offer-card';
import Spinner from '../spinner/spinner';

function SpecialOffers(): JSX.Element {
  const isDiscountTrainingLoading = useAppSelector(
    getIsDiscountTrainingLoading
  );
  const discountTraining = useAppSelector(getDiscountTraining);

  const sliderRef = useRef<SwiperRef>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  if (isDiscountTrainingLoading || !discountTraining) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>
        <Swiper
          slidesPerView={1}
          className="special-offers__list"
          modules={[Navigation, Pagination]}
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
          {discountTraining.entities.map((trainingItem, index) => (
            <SwiperSlide
              key={`discount-${trainingItem.id}`}
              className="special-offers__item"
            >
              <SpecialOfferCard
                training={{
                  image: trainingItem.image,
                  title: trainingItem.title,
                  description: trainingItem.description,
                  price: trainingItem.specialPrice,
                  oldPrice: trainingItem.price,
                }}
                sliderRef={sliderRef}
                slideIndex={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <NoDataFound />
      </div>
    </div>
  );
}

export default SpecialOffers;
