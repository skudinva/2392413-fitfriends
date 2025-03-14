import CustomHelmet from '../../components/custom-helmet/custom-helmet';

function NotFound(): JSX.Element {
  return (
    <section className="error">
      <CustomHelmet pageTitle="Страница не найдена" />
      <h1 className="error__title">404</h1>
      <span className="error__subtitle">Страница не найдена.</span>
    </section>
  );
}

export default NotFound;
