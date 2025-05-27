import { useEffect, useState } from 'react';
import { TRAINING_LEVEL, TRAINING_TYPE } from '../../const';
import {
  LocationName,
  LOCATIONS,
  TrainingLevel,
  TrainingType,
  UserQuery,
  UserRole,
} from '../../types/shared';

const VISUAL_ELEMENT_COUNT = 5;

interface UserCatalogFormProps {
  handleFilterApply(query: UserQuery): void;
}

function UserCatalogForm({
  handleFilterApply,
}: UserCatalogFormProps): JSX.Element {
  const [showAllTrainingType, setShowAllTrainingType] = useState(
    TRAINING_TYPE.length <= VISUAL_ELEMENT_COUNT
  );
  const [showAllLocation, setShowAllLocation] = useState(
    LOCATIONS.length <= VISUAL_ELEMENT_COUNT
  );
  const [locations, setLocations] = useState<LocationName[]>([]);
  const [types, setTypes] = useState<typeof TRAINING_TYPE>([]);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>(
    TrainingLevel.Beginner
  );
  const [role, setRole] = useState<UserRole>();

  useEffect(() => {
    handleFilterApply({
      types,
      locations,
      trainingLevel,
      role,
      page: 1,
    });
  }, [handleFilterApply, locations, role, trainingLevel, types]);

  return (
    <form className="user-catalog-form__form">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">
          Локация, станция метро
        </h4>
        <ul className="user-catalog-form__check-list">
          {(showAllLocation
            ? LOCATIONS
            : LOCATIONS.slice(0, VISUAL_ELEMENT_COUNT)
          ).map((location) => (
            <li
              className="user-catalog-form__check-list-item"
              key={`type-${location}`}
            >
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={location}
                    name="location"
                    id="location"
                    onInput={(evt) => {
                      const { value, checked } = evt.currentTarget;
                      const newLocation = locations.filter(
                        (item) => item !== value
                      );
                      if (checked) {
                        newLocation.push(value as LocationName);
                      }

                      setLocations(newLocation);
                    }}
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{location}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        {!showAllLocation && (
          <button
            className="btn-show-more user-catalog-form__btn-show"
            type="button"
            onClick={() => {
              setShowAllLocation(true);
            }}
          >
            <span>Посмотреть все</span>
            <svg
              className="btn-show-more__icon"
              width="10"
              height="4"
              aria-hidden="true"
            >
              <use xlinkHref="#arrow-down"></use>
            </svg>
          </button>
        )}
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <ul className="user-catalog-form__check-list">
          {(showAllTrainingType
            ? TRAINING_TYPE
            : TRAINING_TYPE.slice(0, VISUAL_ELEMENT_COUNT)
          ).map((trainingType) => (
            <li
              className="user-catalog-form__check-list-item"
              key={`type-${trainingType}`}
            >
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={trainingType}
                    name="spezialization"
                    id="type"
                    onInput={(evt) => {
                      const { value, checked } = evt.currentTarget;
                      const newTypes = types.filter((item) => item !== value);
                      if (checked) {
                        newTypes.push(value as TrainingType);
                      }

                      setTypes(newTypes);
                    }}
                  />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{trainingType}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        {!showAllTrainingType && (
          <button
            className="btn-show-more user-catalog-form__btn-show"
            type="button"
            onClick={() => {
              setShowAllTrainingType(true);
            }}
          >
            <span>Посмотреть все</span>
            <svg
              className="btn-show-more__icon"
              width="10"
              height="4"
              aria-hidden="true"
            >
              <use xlinkHref="#arrow-down"></use>
            </svg>
          </button>
        )}
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <div className="custom-toggle-radio">
          {TRAINING_LEVEL.map((level) => (
            <div
              className="custom-toggle-radio__block"
              key={`trainingLevel-${level}`}
            >
              <label>
                <input
                  type="radio"
                  name="user-agreement"
                  defaultChecked={level === TrainingLevel.Beginner}
                  onInput={() => {
                    setTrainingLevel(level);
                  }}
                  disabled
                />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label">{level}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">
          Сортировка
        </h3>
        <div className="btn-radio-sort">
          <label>
            <input
              type="radio"
              name="sort"
              defaultChecked={role === UserRole.Coach}
              onInput={() => {
                setRole(UserRole.Coach);
              }}
            />
            <span className="btn-radio-sort__label">Тренеры</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              defaultChecked={role === UserRole.Sportsman}
              onInput={() => {
                setRole(UserRole.Sportsman);
              }}
            />
            <span className="btn-radio-sort__label">Пользователи</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default UserCatalogForm;
