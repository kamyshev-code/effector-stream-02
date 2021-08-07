import { sample } from 'effector';

import { analyticsService } from '../analytics';
import {
  onlyConvinientFlightsFilter,
  onlyFastFlightsFilter,
  noOvernightFlightsFilter,
} from './filters';

const { sendEvent } = analyticsService;

const filters = {
  onlyConvinientFlightsFilter,
  onlyFastFlightsFilter,
  noOvernightFlightsFilter,
};

Object.entries(filters).forEach(([name, filter]) => {
  sample({
    source: filter.activate,
    fn: ({ ctx }) => ({ name: `${name}_activated`, payload: { ctx } }),
    target: sendEvent,
  });

  sample({
    source: filter.deactivate,
    fn: () => ({ name: `${name}_deactivated`, payload: {} }),
    target: sendEvent,
  });
});
