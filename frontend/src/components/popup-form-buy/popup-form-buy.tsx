import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSuccessBuyOrder } from '../../store/site-data/selectors';
import { buyTraining } from '../../store/training-action';
import { OrderType, PayType, TrainingWithUserInfo } from '../../types/shared';

interface PopupCommentProps {
  handleClose: () => void;
  training: TrainingWithUserInfo;
}

function PopupFormBuy({
  handleClose,
  training,
}: PopupCommentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSuccessBuyOrder = useAppSelector(getIsSuccessBuyOrder);

  const { specialPrice, title, image } = training;
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentType, setPaymentType] = useState<PayType | null>(null);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setTotalPrice(specialPrice * amount);
  }, [amount, specialPrice]);

  const onButtonClick = () => {
    if (!paymentType) {
      return;
    }
    dispatch(
      buyTraining({
        amount,
        paymentType,
        price: training.price,
        totalPrice,
        trainingId: training.id,
        type: OrderType.Ticket,
        userId: '',
      })
    );
  };

  useEffect(() => {
    setIsInit(true);
  }, [isInit]);

  useEffect(() => {
    if (!isInit) {
      return;
    }

    if (isSuccessBuyOrder) {
      handleClose();
    }
  }, [handleClose, isInit, isSuccessBuyOrder]);

  return (
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
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
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <img src={image} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{title}</h3>
                <p className="popup__product-price">{specialPrice} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="minus"
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value={amount} size={2} readOnly />
                    </label>
                  </div>
                  <button
                    className="btn-icon btn-icon--quantity"
                    type="button"
                    aria-label="plus"
                    onClick={() => setAmount(amount + 1)}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-purchases"
                        aria-label="Visa."
                        onClick={() => setPaymentType(PayType.Visa)}
                      />
                      <span className="btn-radio-image__image">
                        <svg width="58" height="20" aria-hidden="true">
                          <use xlinkHref="#visa-logo"></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-purchases"
                        aria-label="Мир."
                        onClick={() => setPaymentType(PayType.Mir)}
                      />
                      <span className="btn-radio-image__image">
                        <svg width="66" height="20" aria-hidden="true">
                          <use xlinkHref="#mir-logo"></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input
                        type="radio"
                        name="payment-purchases"
                        aria-label="Iomoney."
                        onClick={() => setPaymentType(PayType.Umoney)}
                      />
                      <span className="btn-radio-image__image">
                        <svg width="106" height="24" aria-hidden="true">
                          <use xlinkHref="#iomoney-logo"></use>
                        </svg>
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg
                className="popup__total-dash"
                width="310"
                height="2"
                aria-hidden="true"
              >
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{totalPrice}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <button
                className="btn"
                type="button"
                onClick={() => onButtonClick()}
              >
                Купить
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PopupFormBuy;
