import MultiRangeSlider from 'multi-range-slider-react';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/training-action';
import {
  EntityConstrain,
  SortDirection,
  SortType,
  TrainingQuery,
} from '../../types/shared';

function GymCatalogForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const MAX_PRICE = 10000;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const [sortDirection, SetSortDirection] = useState<SortDirection>(
    SortDirection.Asc
  );
  const [sortBy, SetSortBy] = useState<SortType>(SortType.PRICE);

  const [minCalories, setMinCalories] = useState<number>(
    EntityConstrain.training.calories.minValue
  );
  const [maxCalories, setMaxCalories] = useState<number>(
    EntityConstrain.training.calories.maxValue
  );

  const [minRating, SetMinRating] = useState<number>(0);
  const [maxRating, SetMaxRating] = useState<number>(
    EntityConstrain.feedback.mark.maxValue
  );

  const minPriceInput = useRef<HTMLInputElement>(null);
  const maxPriceInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const query: TrainingQuery = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      minCalories: minCalories,
      maxCalories: maxCalories,
      minRating: minRating,
      maxRating: maxRating,
      sortDirection: sortDirection,
      sortBy: sortBy,
    };
    dispatch(fetchTrainings(query));
  }, [
    dispatch,
    maxCalories,
    maxPrice,
    minCalories,
    minPrice,
    minRating,
    maxRating,
    sortBy,
    sortDirection,
  ]);

  return (
    <form className="gym-catalog-form__form">
      <div className="gym-catalog-form__block gym-catalog-form__block--price">
        <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={minPrice}
              ref={minPriceInput}
              onInput={(evt) => {
                setMinPrice(Number(evt.currentTarget.value));
              }}
            />
            <label htmlFor="minPrice">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              ref={maxPriceInput}
              onInput={(evt) => {
                setMaxPrice(Number(evt.currentTarget.value));
              }}
            />
            <label htmlFor="maxPrice">до</label>
          </div>
        </div>
        <div className="filter-range">
          <MultiRangeSlider
            min={0}
            max={MAX_PRICE}
            step={100}
            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
            ruler="false"
            barLeftColor="black"
            barInnerColor="black"
            barRightColor="black"
            thumbLeftColor="black"
            thumbRightColor="black"
            minValue={minPrice}
            maxValue={maxPrice}
            onInput={(evt) => {
              setMinPrice(evt.minValue);
              setMaxPrice(evt.maxValue);
            }}
          />
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--calories">
        <h4 className="gym-catalog-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input
              type="number"
              id="text-min-cal"
              name="text-min-cal"
              value={minCalories}
              onInput={(evt) => {
                setMinCalories(Number(evt.currentTarget.value));
              }}
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input
              type="number"
              id="text-max-cal"
              name="text-max-cal"
              value={maxCalories}
              onInput={(evt) => {
                setMaxCalories(Number(evt.currentTarget.value));
              }}
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <div className="filter-range">
          <MultiRangeSlider
            min={EntityConstrain.training.calories.minValue}
            max={EntityConstrain.training.calories.maxValue}
            step={100}
            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
            ruler="false"
            barLeftColor="black"
            barInnerColor="black"
            barRightColor="black"
            thumbLeftColor="black"
            thumbRightColor="black"
            minValue={minCalories}
            maxValue={maxCalories}
            onInput={(evt) => {
              setMinCalories(evt.minValue);
              setMaxCalories(evt.maxValue);
            }}
          />
        </div>
      </div>
      <div className="gym-catalog-form__block gym-catalog-form__block--rating">
        <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
        <div className="filter-raiting">
          <MultiRangeSlider
            min={0}
            max={EntityConstrain.feedback.mark.maxValue}
            step={1}
            style={{ border: 'none', boxShadow: 'none', padding: '15px 10px' }}
            ruler="false"
            barLeftColor="black"
            barInnerColor="black"
            barRightColor="black"
            thumbLeftColor="black"
            thumbRightColor="black"
            minValue={minRating}
            maxValue={maxRating}
            onInput={(evt) => {
              SetMinRating(evt.minValue);
              SetMaxRating(evt.maxValue);
            }}
          />
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
            <input
              type="radio"
              name="sort"
              defaultChecked
              onInput={() => {
                SetSortDirection(SortDirection.Asc);
                SetSortBy(SortType.PRICE);
                if (minPriceInput.current) {
                  setMinPrice(Number(minPriceInput.current.value));
                }
                if (maxPriceInput.current) {
                  setMaxPrice(Number(maxPriceInput.current.value));
                }
              }}
            />
            <span className="btn-radio-sort__label">Дешевле</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="expensive"
              onInput={() => {
                SetSortDirection(SortDirection.Desc);
                SetSortBy(SortType.PRICE);
                if (minPriceInput.current) {
                  setMinPrice(Number(minPriceInput.current.value));
                }
                if (maxPriceInput.current) {
                  setMaxPrice(Number(maxPriceInput.current.value));
                }
              }}
            />
            <span className="btn-radio-sort__label">Дороже</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="free"
              onInput={() => {
                setMinPrice(0);
                setMaxPrice(0);
              }}
            />
            <span className="btn-radio-sort__label">Бесплатные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default GymCatalogForm;
