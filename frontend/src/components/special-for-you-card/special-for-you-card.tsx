import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Training } from '../../types/shared';

interface SpecialForYouCardProps {
  training: Training;
}

function SpecialForYouCard({ training }: SpecialForYouCardProps): JSX.Element {
  const { id, title, image } = training;

  return (
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source type="image/webp" srcSet={image} />
          <img src={image} srcSet={image} width="452" height="191" alt="" />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{title}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <Link
            className="btn btn--small thumbnail-preview__button"
            to={`${AppRoute.Trainings}/${id}`}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SpecialForYouCard;
