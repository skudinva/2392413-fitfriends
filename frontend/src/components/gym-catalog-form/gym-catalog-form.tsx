import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/training-action';
import { SortDirection, SortType, TrainingQuery } from '../../types/shared';

function GymCatalogForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState<TrainingQuery | object>({});

  const onFilterChange = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (evt.target instanceof HTMLInputElement) {
      const { value, name } = evt.target;
      console.log({ value, name });
      if (value === 'cheep') {
        setQuery({
          ...query,
          sortDirection: SortDirection.Asc,
          sortBy: SortType.PRICE,
        });
      } else if (value === 'expensive') {
        setQuery({
          ...query,
          sortDirection: SortDirection.Desc,
          sortBy: SortType.PRICE,
        });
      }
    }
  };

  useEffect(() => {
    dispatch(fetchTrainings(query));
  }, [dispatch, query]);

  return (
    <form className="gym-catalog-form__form" onInput={onFilterChange}>
      <div className="gym-catalog-form__block gym-catalog-form__block--price">
        <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              name="text-min"
              defaultValue="0"
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              name="text-max"
              defaultValue="3200"
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <button className="filter-range__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
        <h4 className="gym-catalog-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input type="number" id="text-min-cal" name="text-min-cal" />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input type="number" id="text-max-cal" name="text-max-cal" />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <div className="filter-range">
          <div className="filter-range__scale">
            <div className="filter-range__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-range__control">
            <button className="filter-range__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <button className="filter-range__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <div className="filter-raiting__scale">
            <div className="filter-raiting__bar">
              <span className="visually-hidden">Полоса прокрутки</span>
            </div>
          </div>
          <div className="filter-raiting__control">
            <button className="filter-raiting__min-toggle">
              <span className="visually-hidden">Минимальное значение</span>
            </button>
            <span>1</span>
            <button className="filter-raiting__max-toggle">
              <span className="visually-hidden">Максимальное значение</span>
            </button>
            <span>5</span>
          </div>
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <ul className="gym-catalog-form__check-list">
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">йога</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">силовые</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="type"
                  name="type"
                  defaultChecked
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">кроссфит</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  defaultValue="type-1"
                  name="type"
                  defaultChecked
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">бокс</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">бег</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">аэробика</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">пилатес</span>
              </label>
            </div>
          </li>
          <li className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input type="checkbox" defaultValue="type-1" name="type" />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">стрейчинг</span>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">
          Сортировка
        </h4>
        <div className="btn-radio-sort gym-catalog-form__radio">
          <label>
            <input type="radio" name="sort" value="cheep" defaultChecked />
            <span className="btn-radio-sort__label">Дешевле</span>
          </label>
          <label>
            <input type="radio" name="sort" value="expensive" />
            <span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input type="radio" name="sort" />
            <span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default GymCatalogForm;
