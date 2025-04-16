import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOrders, fetchTrainingState } from '../../store/order-action';
import {
  fetchComment,
  fetchDiscountTrainings,
  fetchPopularTrainings,
  fetchSpecialTrainings,
  fetchTraining,
  fetchTrainings,
} from '../../store/training-action';
import { fetchUserInfo } from '../../store/user-action';
import {
  getAuthorizationStatus,
  getCurrentUserId,
} from '../../store/user-process/selectors';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userId = useAppSelector(getCurrentUserId);
  const { trainingId } = useParams();

  useEffect(() => {
    if (trainingId) {
      dispatch(fetchTraining(+trainingId));
      dispatch(fetchTrainingState(+trainingId));
      dispatch(fetchComment(+trainingId));
    }
  }, [dispatch, trainingId]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUserInfo(userId));
      dispatch(fetchSpecialTrainings());
      dispatch(fetchDiscountTrainings());
      dispatch(fetchPopularTrainings());
      dispatch(fetchTrainings(null));
      dispatch(fetchOrders({ page: 1, activeOnly: false }));
    }
  }, [dispatch, authorizationStatus, userId]);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
