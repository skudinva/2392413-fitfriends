import { MouseEvent, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import CommentsList from '../../components/comments-list/comments-list';
import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import ModalWindow from '../../components/modal-window/modal-window';
import PopupComment from '../../components/popup-comment/popup-comment';
import Spinner from '../../components/spinner/spinner';
import TrainingInfo from '../../components/training-info/training-info';
import { useAppSelector } from '../../hooks';
import { getIsTrainingCardLoading } from '../../store/site-data/selectors';

function TrainingCard(): JSX.Element {
  const isTrainingCardLoading = useAppSelector(getIsTrainingCardLoading);
  const [showModal, setShowModal] = useState(false);

  const onAddCommentButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const onCloseCommentForm = () => {
    setShowModal(false);
  };

  if (isTrainingCardLoading) {
    return <Spinner />;
  }

  if (showModal) {
    return (
      <ModalWindow handleClose={onCloseCommentForm}>
        <PopupComment handleClose={onCloseCommentForm} />
      </ModalWindow>
    );
  }

  return (
    <>
      <CustomHelmet pageTitle="Карточка тренировки" />
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>

            <aside className="reviews-side-bar">
              <BackButton baseClassName="btn-flat--underlined reviews-side-bar__back" />
              <h2 className="reviews-side-bar__title">Отзывы</h2>
              <CommentsList />
              <button
                className="btn btn--medium reviews-side-bar__button"
                type="button"
                onClick={onAddCommentButtonClick}
              >
                Оставить отзыв
              </button>
            </aside>
            <TrainingInfo />
          </div>
        </div>
      </section>
    </>
  );
}

export default TrainingCard;
