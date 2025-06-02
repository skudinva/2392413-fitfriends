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
import { fetchUserCompany, fetchUserInfo } from '../../store/user-action';
import {
  getAuthorizationStatus,
  getCurrentUserId,
  getUserRole,
} from '../../store/user-process/selectors';
import { UserRole } from '../../types/shared';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userId = useAppSelector(getCurrentUserId);
  const { trainingId } = useParams();
  const userRole = useAppSelector(getUserRole);

  useEffect(() => {
    if (trainingId) {
      dispatch(fetchTraining(+trainingId));
      dispatch(fetchTrainingState(+trainingId));
      dispatch(fetchComment(+trainingId));
    }
  }, [dispatch, trainingId]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      if (userId) {
        dispatch(fetchUserInfo(userId));
      }

      if (userRole === UserRole.Sportsman) {
        dispatch(fetchTrainings(null));
        dispatch(fetchSpecialTrainings());
        dispatch(fetchDiscountTrainings());
        dispatch(fetchPopularTrainings());
        dispatch(fetchUserCompany());
      }

      dispatch(
        fetchOrders({
          page: 1,
          activeOnly: false,
          userId: '',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, authorizationStatus]);

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
