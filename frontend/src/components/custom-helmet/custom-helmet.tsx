import { Helmet } from 'react-helmet-async';
import { PROJECT_NAME } from '../../const';

interface CustomHelmetProps {
  pageTitle?: string;
}

function CustomHelmet({ pageTitle }: CustomHelmetProps): JSX.Element {
  return (
    <Helmet>
      <title>
        {pageTitle ? `${pageTitle} - ` : ''}
        {PROJECT_NAME}
      </title>
    </Helmet>
  );
}

export default CustomHelmet;
