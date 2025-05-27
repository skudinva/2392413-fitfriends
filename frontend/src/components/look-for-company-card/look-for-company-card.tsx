import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { LocationName, TrainingType, UserRole } from '../../types/shared';

interface LookForCompanyCardProps {
  userInfo: {
    id: string;
    name: string;
    location: LocationName;
    hashtag: TrainingType;
    avatar: string;
    role: UserRole;
  };
}

function LookForCompanyCard({
  userInfo,
}: LookForCompanyCardProps): JSX.Element {
  return (
    <div
      className={`thumbnail-user ${
        userInfo.role === UserRole.Coach
          ? 'thumbnail-user--role-coach'
          : 'thumbnail-user--role-user'
      }`}
    >
      <div className="thumbnail-user__image">
        <picture>
          <img src={userInfo.avatar} width="82" height="82" alt="" />
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{userInfo.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">
            {userInfo.location}
          </address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        <li className="thumbnail-user__hashtags-item">
          <div className="hashtag thumbnail-user__hashtag">
            <span>#{userInfo.hashtag}</span>
          </div>
        </li>
      </ul>
      <Link
        className="btn btn--medium thumbnail-user__button"
        to={`${AppRoute.UserCard}/${userInfo.id}`}
      >
        Подробнее
      </Link>
    </div>
  );
}

export default LookForCompanyCard;
