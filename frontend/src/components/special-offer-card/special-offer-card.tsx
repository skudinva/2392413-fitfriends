import { SwiperRef } from 'swiper/react';
import { Training } from '../../types/shared';

interface SpecialOfferCardProps {
  training: Pick<Training, 'image' | 'title' | 'description' | 'price'> & {
    oldPrice: number;
  };
  sliderRef: React.RefObject<SwiperRef>;
  slideIndex: number;
}

function SpecialOfferCard({
  training,
  sliderRef,
  slideIndex,
}: SpecialOfferCardProps): JSX.Element {
  const { image, title, description, price, oldPrice } = training;

  return (
    <aside className="promo-slider">
      <div className="promo-slider__overlay"></div>
      <div className="promo-slider__image">
        <img src={image} width="1040" height="469" alt="promo-photo" />
      </div>
      <div className="promo-slider__header">
        <h3 className="promo-slider__title">{title}</h3>
        <div className="promo-slider__logo">
          <svg width="74" height="74" aria-hidden="true">
            <use xlinkHref="#logotype"></use>
          </svg>
        </div>
      </div>
      <span className="promo-slider__text">{description}</span>
      <div className="promo-slider__bottom-container">
        <div className="promo-slider__slider-dots">
          <button
            className={`promo-slider__slider-dot ${
              slideIndex === 0 ? 'promo-slider__slider-dot--active' : ''
            }`}
            aria-label="первый слайд"
            onClick={() => sliderRef.current?.swiper.slideTo(0)}
          />
          <button
            className={`promo-slider__slider-dot ${
              slideIndex === 1 ? 'promo-slider__slider-dot--active' : ''
            }`}
            aria-label="второй слайд"
            onClick={() => sliderRef.current?.swiper.slideTo(1)}
          />
          <button
            className={`promo-slider__slider-dot ${
              slideIndex === 2 ? 'promo-slider__slider-dot--active' : ''
            }`}
            aria-label="третий слайд"
            onClick={() => sliderRef.current?.swiper.slideTo(2)}
          />
        </div>
        <div className="promo-slider__price-container">
          <p className="promo-slider__price">{price} ₽</p>
          <p className="promo-slider__sup">за занятие</p>
          <p className="promo-slider__old-price">{oldPrice} ₽</p>
        </div>
      </div>
    </aside>
  );
}

export default SpecialOfferCard;
