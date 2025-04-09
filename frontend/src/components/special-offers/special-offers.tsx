import { useAppSelector } from '../../hooks';
import {
  getDiscountTraining,
  getIsDiscountTrainingLoading,
} from '../../store/site-data/selectors';
import SpecialOfferCard from '../special-offer-card/special-offer-card';
import Spinner from '../spinner/spinner';

function SpecialOffers(): JSX.Element {
  const isDiscountTrainingLoading = useAppSelector(
    getIsDiscountTrainingLoading
  );
  const discountTraining = useAppSelector(getDiscountTraining);

  if (isDiscountTrainingLoading || !discountTraining) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>
        <ul className="special-offers__list">
          {discountTraining.entities.map((trainingItem, index) => (
            <SpecialOfferCard
              key={`discount-${trainingItem.id}`}
              training={{
                image: trainingItem.image,
                title: trainingItem.title,
                description: trainingItem.description,
                price: trainingItem.price,
                oldPrice: trainingItem.specialPrice,
              }}
              isActive={index === 0}
            />
          ))}
        </ul>
        <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
              />
              <img
                src="img/content/thumbnails/nearest-gym-01.jpg"
                srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">
              Скоро здесь появится что - то полезное
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffers;
