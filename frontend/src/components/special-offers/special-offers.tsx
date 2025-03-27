import SpecialOfferCard from '../special-offer-card/special-offer-card';

function SpecialOffers(): JSX.Element {
  return (
    <div className="container">
      <div className="special-offers__wrapper">
        <h2 className="visually-hidden">Специальные предложения</h2>
        <ul className="special-offers__list">
          <SpecialOfferCard
            training={{
              image: 'img/content/promo-1.png',
              title: 'Fitball',
              description: 'Горячие предложения на тренировки на фитболе',
              price: 1600,
              oldPrice: 2000,
            }}
            isActive
          />
          <SpecialOfferCard
            training={{
              image: 'img/content/promo-2.png',
              title: 'Fleksbend',
              description:
                'Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса',
              price: 2400,
              oldPrice: 2800,
            }}
            isActive={false}
          />
          <SpecialOfferCard
            training={{
              image: 'img/content/promo-3.png',
              title: 'Full Body Stretch',
              description:
                'Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков',
              price: 1800,
              oldPrice: 2200,
            }}
            isActive={false}
          />
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
