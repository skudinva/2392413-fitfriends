import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSuccessAddTrainingComment } from '../../store/site-data/selectors';
import { createComment } from '../../store/training-action';

interface PopupCommentProps {
  handleClose: () => void;
}

function PopupComment({ handleClose }: PopupCommentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSuccessAddTrainingComment = useAppSelector(
    getIsSuccessAddTrainingComment
  );
  const { trainingId } = useParams();
  const description = useRef<HTMLTextAreaElement>(null);
  const [rating, setRating] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const [ratingError, setRatingError] = useState<string>('');
  const [isInit, setIsInit] = useState(false);

  const validateRating = useCallback(() => {
    if (!rating) {
      setRatingError('Обязательное поле');
    } else {
      setRatingError('');
    }
  }, [rating]);

  const onRatingInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const newRating = evt.target.value;
    setRating(newRating);
    validateRating();
  };

  const onDescriptionInput = () => {
    if (!description.current) {
      return;
    }
    if (!description.current.value) {
      setDescriptionError('Обязательное поле');
    } else if ((description.current.value ?? '').length < 5) {
      setDescriptionError(
        'Минимальная длина 100 символ. Максимальная длина 1024 символов'
      );
    } else {
      setDescriptionError('');
    }
  };

  const validateDescription = onDescriptionInput;

  const onButtonClick = () => {
    if (!trainingId) {
      return;
    }

    dispatch(
      createComment({
        userId: '',
        trainingId: +trainingId,
        rating: Number(rating),
        message: description.current?.value ?? '',
      })
    );
  };

  useEffect(() => {
    if (!isInit) {
      validateDescription();
      validateRating();
    }

    setIsInit(true);
  }, [
    descriptionError,
    isInit,
    ratingError,
    validateDescription,
    validateRating,
  ]);

  useEffect(() => {
    if (!isInit) {
      return;
    }

    if (isSuccessAddTrainingComment) {
      handleClose();
    }
  }, [handleClose, isInit, isSuccessAddTrainingComment]);

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={handleClose}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <ul className="popup__rate-list">
              {Array.from({ length: 5 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="popup__rate-item" key={`rating-${index + 1}`}>
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        aria-label={`оценка ${index + 1}.`}
                        defaultValue={index + 1}
                        required
                        onInput={onRatingInput}
                      />
                      <span className="popup__rate-number">{index + 1}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">
                Поделитесь своими впечатлениями о тренировке
              </h3>
              <div className="popup__feedback-textarea">
                <div
                  className={`custom-textarea ${
                    descriptionError && 'custom-input--error'
                  }`}
                >
                  <label>
                    <textarea
                      name="description"
                      placeholder=""
                      required
                      ref={description}
                      onInput={onDescriptionInput}
                    />
                    {descriptionError && (
                      <span className="custom-textarea__error">
                        {descriptionError}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button
                className="btn"
                type="button"
                onClick={onButtonClick}
                disabled={descriptionError.length > 0 || ratingError.length > 0}
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupComment;
