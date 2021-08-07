/* eslint-disable no-use-before-define */
import { combine } from 'effector';
import { flow } from 'lodash';

import {
  noOvernightFlightsFilter,
  onlyConvinientFlightsFilter,
  onlyFastFlightsFilter,
} from '../filters/filters';
import { $results, Result } from '../results/results';

const $filteredFlights = combine(
  {
    results: $results,
    noOvernightFlightsActive: noOvernightFlightsFilter.$active,
    onlyConvinientFlightsActive: onlyConvinientFlightsFilter.$active,
    onlyFastFlightsActive: onlyFastFlightsFilter.$active,
  },
  ({
    results,
    noOvernightFlightsActive,
    onlyConvinientFlightsActive,
    onlyFastFlightsActive,
  }): Result[] =>
    flow([
      (r: Result[]) =>
        noOvernightFlightsFilter.apply(noOvernightFlightsActive, r),
      (r: Result[]) =>
        onlyConvinientFlightsFilter.apply(onlyConvinientFlightsActive, r),
      (r: Result[]) => onlyFastFlightsFilter.apply(onlyFastFlightsActive, r),
    ])(results),
);

export { $filteredFlights };
