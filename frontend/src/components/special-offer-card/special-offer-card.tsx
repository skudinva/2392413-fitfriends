import { Training } from '../../types/shared';

interface SpecialOfferCardProps {
  training: Pick<Training, 'image' | 'title' | 'description' | 'price'> & {
    oldPrice: number;
  };
  isActive: boolean;
}

function SpecialOfferCard({
  training,
  isActive,
}: SpecialOfferCardProps): JSX.Element {
  const { image, title, description, price, oldPrice } = training;

  return (
    <li className={`special-offers__item ${isActive ? 'is-active' : ''}`}>
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
              className="promo-slider__slider-dot--active promo-slider__slider-dot"
              aria-label="первый слайд"
            />
            <button
              className="promo-slider__slider-dot"
              aria-label="второй слайд"
            />
            <button
              className="promo-slider__slider-dot"
              aria-label="третий слайд"
            />
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{oldPrice} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default SpecialOfferCard;
