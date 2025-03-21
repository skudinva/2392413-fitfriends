import { useEffect, useRef, useState } from 'react';
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
  const rating = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [trySaveComment, setTrySaveComment] = useState(false);

  const onButtonClick = () => {
    if (!trainingId) {
      return;
    }

    setTrySaveComment(true);

    dispatch(
      createComment({
        userId: '',
        trainingId: +trainingId,
        rating: Number(rating.current?.value),
        message: description.current?.value ?? '',
      })
    );
  };

  useEffect(() => {
    if (!trySaveComment) {
      return;
    }

    if (isSuccessAddTrainingComment) {
      handleClose();
    }
  }, [handleClose, isSuccessAddTrainingComment, trySaveComment]);

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
                        name="оценка тренировки"
                        aria-label={`оценка ${index + 1}.`}
                        value={index + 1}
                        required
                        ref={rating}
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
                <div className="custom-textarea">
                  <label>
                    <textarea
                      name="description"
                      placeholder=""
                      required
                      ref={description}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={onButtonClick}>
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
