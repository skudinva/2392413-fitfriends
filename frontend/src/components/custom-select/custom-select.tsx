import { useState } from 'react';

interface CustomSelectProps {
  isEdit: boolean;
  labelText: string;
  selectValues: string[];
  containerClassName: string;
  defaultValue: string;
  placeholderPrefix?: string;
  componentName: string;
}

function CustomSelect({
  isEdit,
  labelText,
  selectValues,
  containerClassName,
  defaultValue,
  placeholderPrefix,
  componentName,
}: CustomSelectProps): JSX.Element {
  type TypeOfValue = (typeof selectValues)[number];
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const onArrowButtonClick = () => {
    setIsOpened(!isOpened);
  };

  const [selectedValue, setSelectedValue] = useState<TypeOfValue>(defaultValue);

  const onLocationClick = (evt: React.MouseEvent<HTMLLIElement>) => {
    setSelectedValue(evt.currentTarget.innerText);
    setIsOpened(false);
  };

  return (
    <div
      className={[
        'custom-select',
        isEdit ? '' : 'custom-select--readonly',
        isEdit
          ? `${containerClassName}-edit__select`
          : `${containerClassName}__select`,
        isOpened ? 'is-open' : '',
      ].join(' ')}
    >
      <input
        className="visually-hidden"
        type="text"
        defaultValue={selectedValue}
        name={componentName}
      />
      <span className="custom-select__label">{labelText}</span>
      <div className="custom-select__placeholder">
        {placeholderPrefix}
        {selectedValue}
      </div>
      <button
        className="custom-select__button"
        type="button"
        aria-label="Выберите одну из опций"
        onClick={onArrowButtonClick}
        disabled={!isEdit}
      >
        <span className="custom-select__text">{selectedValue}</span>
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </span>
      </button>

      <ul className="custom-select__list" role="listbox">
        {selectValues.map((locationItem) => (
          <li
            key={locationItem}
            role="option"
            className="custom-select__item"
            aria-selected={locationItem === selectedValue}
            onClick={onLocationClick}
          >
            {locationItem}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomSelect;
