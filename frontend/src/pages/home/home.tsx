import CustomHelmet from '../../components/custom-helmet/custom-helmet';
import LookForCompany from '../../components/look-for-company/look-for-company';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';

function Home(): JSX.Element {
  return (
    <>
      <CustomHelmet />
      <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
      </h1>
      <section className="special-for-you">
        <SpecialForYou />
      </section>
      <section className="special-offers">
        <SpecialOffers />
      </section>
      <section className="popular-trainings">
        <PopularTrainings />
      </section>
      <section className="look-for-company">
        <LookForCompany />
      </section>
    </>
  );
}

export default Home;
