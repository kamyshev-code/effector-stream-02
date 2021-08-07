import { sample } from 'effector';

import { analyticsService } from '../analytics';
import { $filteredFlights } from './filtered';

sample({
  source: $filteredFlights,
  fn(flights) {
    return {
      name: 'filtered_flight_count',
      payload: { count: flights.length },
    };
  },
  target: analyticsService.sendEvent,
});
