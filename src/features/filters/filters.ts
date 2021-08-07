import { differenceInHours, getHours, isSameDay } from 'date-fns';
import { split } from 'effector';

import { Result } from '../results';
import { createFilter, not } from './lib';

const noOvernightFlightsFilter = createFilter('noOvernightFlightsFilter', {
  isFit: (result: Result) => {
    const sameDay = isSameDay(result.departure, result.arrival);
    const departureAfterMorningStart = getHours(result.departure) > 8;

    return sameDay && departureAfterMorningStart;
  },
});
const onlyConvinientFlightsFilter = createFilter(
  'onlyConvinientFlightsFilter',
  {
    isFit: (result: Result) => isSameDay(result.departure, result.arrival),
  },
);
const onlyFastFlightsFilter = createFilter('onlyFastFlightsFilter', {
  isFit: (result: Result) =>
    differenceInHours(result.arrival, result.departure) < 6,
});

split({
  source: noOvernightFlightsFilter.$active,
  match: {
    active: noOvernightFlightsFilter.$active,
    inactive: noOvernightFlightsFilter.$active.map(not),
  },
  cases: {
    active: onlyConvinientFlightsFilter.disable,
    inactive: onlyConvinientFlightsFilter.enable,
  },
});

export {
  noOvernightFlightsFilter,
  onlyConvinientFlightsFilter,
  onlyFastFlightsFilter,
};
