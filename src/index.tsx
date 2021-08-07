import { render } from 'react-dom';
import 'antd/dist/antd.css';

import { SearchForm } from './features/search';
import { ResultsPage } from './features/results';
import { FiltersBar } from './features/filters';
import { analyticsService } from './features/analytics';

const Application = () => (
  <>
    <SearchForm />
    <FiltersBar />
    <ResultsPage />
  </>
);

render(<Application />, document.getElementById('app'));

analyticsService.initFx();
