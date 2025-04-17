import { MouseEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateTrainingState } from '../../store/order-action';
import {
  getIsUserOrderSave,
  getTrainingCard,
  getTrainingState,
} from '../../store/site-data/selectors';
import { getUserInfo } from '../../store/user-process/selectors';
import { UserGender, UserRole } from '../../types/shared';
import ModalWindow from '../modal-window/modal-window';
import PopupFormBuy from '../popup-form-buy/popup-form-buy';
import Spinner from '../spinner/spinner';

function TrainingInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(getUserInfo);
  const trainingCard = useAppSelector(getTrainingCard);
  const trainingState = useAppSelector(getTrainingState);
  const isUserOrderSave = useAppSelector(getIsUserOrderSave);
  const [isEdit, setIsEdit] = useState(false);
  const [isSpecial, setIsSpecial] = useState(trainingCard?.isSpecial);

  const canBuy =
    trainingState === undefined ||
    trainingState === null ||
    trainingState.isDone;

  const canStart = !canBuy && trainingState && !trainingState.isStarted;
  const canFinish = !canBuy && trainingState && trainingState.isStarted;

  const [showModal, setShowModal] = useState(false);

  const onCloseCommentForm = () => {
    setShowModal(false);
  };

  const onBuyButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const onSaveButtonClick = () => {
    setIsEdit(false);
  };

  const onStartButtonClick = (state: 'start' | 'finish') => {
    if (!trainingCard) {
      return;
    }

    dispatch(
      updateTrainingState({
        trainingId: trainingCard.id,
        state,
        userId: '',
      })
    );
  };

  if (showModal && trainingCard) {
    return (
      <ModalWindow handleClose={onCloseCommentForm}>
        <PopupFormBuy
          handleClose={onCloseCommentForm}
          training={trainingCard}
        />
      </ModalWindow>
    );
  }

  if (!userInfo) {
    return <Spinner />;
  }
  const isCoach = userInfo.role === UserRole.Coach;

  return (
    <div className={`training-card ${isEdit ? 'training-card--edit' : ''}`}>
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <div className="training-info__header">
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <img
                  src={trainingCard?.userInfo.avatar}
                  width="64"
                  height="64"
                  alt="Изображение тренера"
                />
              </picture>
            </div>

            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">
                {trainingCard?.userInfo.name}
              </span>
            </div>
          </div>
          <button
            className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--edit"
            type="button"
            onClick={() => setIsEdit(true)}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Редактировать</span>
          </button>
          <button
            className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
            type="button"
            onClick={() => onSaveButtonClick()}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
        </div>
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label>
                    <span className="training-info__label">
                      Название тренировки
                    </span>
                    <input
                      type="text"
                      name="training"
                      defaultValue={trainingCard?.title}
                      disabled={!isEdit}
                    />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">
                      Описание тренировки
                    </span>
                    <textarea
                      name="description"
                      disabled={!isEdit}
                      defaultValue={trainingCard?.description}
                    />
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                    </span>
                    <input
                      type="number"
                      name="rating"
                      defaultValue={trainingCard?.rating}
                      disabled={!isEdit}
                    />
                  </label>
                </div>
                <ul className="training-info__list">
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{trainingCard?.type}</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>
                        {trainingCard?.gender === UserGender.Female &&
                          '#для_женщин'}
                        {trainingCard?.gender === UserGender.Man &&
                          '#для_мужчин'}
                        {trainingCard?.gender === UserGender.NotAvailable &&
                          '#для_всех'}
                      </span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{trainingCard?.calories}ккал</span>
                    </div>
                  </li>
                  <li className="training-info__item">
                    <div className="hashtag hashtag--white">
                      <span>#{trainingCard?.duration}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label>
                    <span className="training-info__label">Стоимость</span>
                    <input
                      type="text"
                      name="price"
                      defaultValue={`${trainingCard?.price || 0}${
                        !isEdit ? ' ₽' : ''
                      }`}
                      disabled={!isEdit}
                    />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {isCoach ? (
                  <button
                    className="btn-flat btn-flat--light btn-flat--underlined"
                    type="button"
                    disabled={!isEdit}
                    onClick={() => setIsSpecial(!isSpecial)}
                  >
                    <svg width="14" height="14" aria-hidden="true">
                      <use xlinkHref="#icon-discount"></use>
                    </svg>
                    <span>
                      {isSpecial ? 'Отменить скидку' : 'Сделать скидку 10%'}
                    </span>
                  </button>
                ) : (
                  <button
                    className="btn training-info__buy"
                    type="button"
                    onClick={onBuyButtonClick}
                    disabled={!canBuy}
                  >
                    Купить
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x"
              />
              <img
                src="img/content/training-video/video-thumbnail.png"
                srcSet="img/content/training-video/video-thumbnail@2x.png 2x"
                width="922"
                height="566"
                alt="Обложка видео"
              />
            </picture>
          </div>
          <button
            className={`training-video__play-button btn-reset ${
              !canFinish ? 'is-disabled' : ''
            }`}
          >
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="training-video__drop-files">
          <form action="#" method="post">
            <div className="training-video__form-wrapper">
              <div className="drag-and-drop">
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
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
        <div className="training-video__buttons-wrapper">
          {!isCoach && canFinish && (
            <button
              className={`btn training-video__button training-video__button--start ${
                isUserOrderSave ? 'is-disabled' : ''
              }`}
              type="button"
              onClick={() => onStartButtonClick('finish')}
              disabled={isUserOrderSave}
            >
              Закончить
            </button>
          )}
          {!isCoach && !canFinish && (
            <button
              className={`btn training-video__button training-video__button--start ${
                !canStart || isUserOrderSave ? 'is-disabled' : ''
              }`}
              type="button"
              onClick={() => onStartButtonClick('start')}
              disabled={!canStart || isUserOrderSave}
            >
              Приступить
            </button>
          )}
          {isCoach && (
            <div className="training-video__edit-buttons">
              <button className="btn" type="button">
                Сохранить
              </button>
              <button className="btn btn--outlined" type="button">
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrainingInfo;
