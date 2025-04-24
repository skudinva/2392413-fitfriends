import { FormEvent, useState } from 'react';
import { TRAINING_LEVEL, TRAINING_TYPE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { createTraining } from '../../store/training-action';
import { TRAINING_DURATIONS, UserGender } from '../../types/shared';
import { getRandomValue } from '../../utils';
import CustomSelect from '../custom-select/custom-select';

const FieldMap = {
  type: 'type',
  calories: 'calories',
  duration: 'duration',
  price: 'price',
  level: 'level',
  gender: 'gender',
  description: 'description',
  title: 'training-name',
  specialPrice: 'price',
  isSpecial: 'isSpecial',
} as const;

function TrainingForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [video, setVideo] = useState<File>();
  const onVideoUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setVideo(evt.target.files[0]);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const trainingData = new FormData();

    Object.entries(FieldMap).forEach(([key, value]) => {
      trainingData.append(key, formData.get(value)?.toString() || '');
    });

    if (video) {
      trainingData.append('video', video);
    }

    trainingData.append(
      'image',
      `img/content/training-${getRandomValue(1, 4, 0)}.png`
    );

    dispatch(createTraining(trainingData));
  };

  return (
    <form method="get" onSubmit={onFormSubmit}>
      <input type="hidden" name="isSpecial" value="false" />
      <div className="create-training">
        <div className="create-training__wrapper">
          <div className="create-training__block">
            <h2 className="create-training__legend">Название тренировки</h2>
            <div className="custom-input create-training__input">
              <label>
                <span className="custom-input__wrapper">
                  <input type="text" name="training-name" required />
                </span>
              </label>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">
              Характеристики тренировки
            </h2>
            <div className="create-training__info">
              <CustomSelect
                isEdit
                labelText="Выберите тип тренировки"
                selectValues={[...TRAINING_TYPE]}
                containerClassName=""
                defaultValue=""
                placeholderPrefix=""
                componentName="type"
              />
              <div className="custom-input custom-input--with-text-right">
                <label>
                  <span className="custom-input__label">
                    Сколько калорий потратим
                  </span>
                  <span className="custom-input__wrapper">
                    <input type="number" name="calories" required />
                    <span className="custom-input__text">ккал</span>
                  </span>
                </label>
              </div>
              <CustomSelect
                isEdit
                labelText="Сколько времени потратим"
                selectValues={[...TRAINING_DURATIONS]}
                containerClassName=""
                defaultValue=""
                placeholderPrefix=""
                componentName="duration"
              />
              <div className="custom-input custom-input--with-text-right">
                <label>
                  <span className="custom-input__label">
                    Стоимость тренировки
                  </span>
                  <span className="custom-input__wrapper">
                    <input type="number" name="price" required />
                    <span className="custom-input__text">₽</span>
                  </span>
                </label>
              </div>
              <CustomSelect
                isEdit
                labelText="Выберите уровень тренировки"
                selectValues={TRAINING_LEVEL}
                containerClassName=""
                defaultValue=""
                placeholderPrefix=""
                componentName="level"
              />
              <div className="create-training__radio-wrapper">
                <span className="create-training__label">
                  Кому подойдет тренировка
                </span>
                <br />
                <div className="custom-toggle-radio create-training__radio">
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={UserGender.Man}
                        required
                      />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">
                        Мужчинам
                      </span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={UserGender.Female}
                        required
                      />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">
                        Женщинам
                      </span>
                    </label>
                  </div>
                  <div className="custom-toggle-radio__block">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={UserGender.NotAvailable}
                        required
                      />
                      <span className="custom-toggle-radio__icon"></span>
                      <span className="custom-toggle-radio__label">Всем</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">Описание тренировки</h2>
            <div className="custom-textarea create-training__textarea">
              <label>
                <textarea name="description" placeholder="" />
              </label>
            </div>
          </div>
          <div className="create-training__block">
            <h2 className="create-training__legend">
              Загрузите видео-тренировку
            </h2>
            <div className="drag-and-drop create-training__drag-and-drop">
              <label>
                <span className="drag-and-drop__label" tabIndex={0}>
                  Загрузите сюда файлы формата MOV, AVI или MP4
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-import-video"></use>
                  </svg>
                </span>
                <input
                  type="file"
                  name="import"
                  tabIndex={-1}
                  accept=".mov, .avi, .mp4"
                  required
                  onChange={onVideoUpload}
                />
              </label>
            </div>
          </div>
        </div>
        <button className="btn create-training__button" type="submit">
          Опубликовать
        </button>
      </div>
    </form>
  );
}

export default TrainingForm;
