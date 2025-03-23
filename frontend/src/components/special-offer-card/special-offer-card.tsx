import { Training } from '../../types/shared';

interface SpecialOfferCardProps {
  training: Training & { oldPrice: number };
}

function SpecialOfferCard({ training }: SpecialOfferCardProps): JSX.Element {
  return (
    <li className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img
            src={training.image}
            width="1040"
            height="469"
            alt="promo-photo"
          />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{training.title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">{training.description}</span>
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
            <p className="promo-slider__price">{training.price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{training.oldPrice} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default SpecialOfferCard;
