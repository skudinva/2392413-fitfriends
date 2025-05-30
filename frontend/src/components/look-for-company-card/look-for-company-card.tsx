import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { LocationName, TrainingType, UserRole } from '../../types/shared';

interface LookForCompanyCardProps {
  style: 'light' | 'dark';
  userInfo: {
    id: string;
    name: string;
    location: LocationName;
    hashtags: TrainingType[];
    avatar: string;
    role: UserRole;
  };
}

const VISUAL_HASHTAG_COUNT = 3;

function LookForCompanyCard({
  userInfo,
  style,
}: LookForCompanyCardProps): JSX.Element {
  return (
    <div
      className={`thumbnail-user ${
        userInfo.role === UserRole.Coach
          ? 'thumbnail-user--role-coach'
          : 'thumbnail-user--role-user'
      }
      ${style === 'dark' ? 'thumbnail-user--dark' : ''}
      `}
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
        {userInfo.hashtags.slice(0, VISUAL_HASHTAG_COUNT).map((hashtag) => (
          <li
            className="thumbnail-user__hashtags-item"
            key={`hashtag-${hashtag}`}
          >
            <div className="hashtag thumbnail-user__hashtag">
              <span>#{hashtag}</span>
            </div>
          </li>
        ))}
      </ul>
      <Link
        className={`btn btn--medium thumbnail-user__button  ${
          style === 'dark' ? 'btn--outlined btn--dark-bg' : ''
        }`}
        to={`${AppRoute.UserCard}/${userInfo.id}`}
      >
        Подробнее
      </Link>
    </div>
  );
}

export default LookForCompanyCard;
