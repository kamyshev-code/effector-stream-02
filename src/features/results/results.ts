import { addHours } from 'date-fns';
import { createStore, sample } from 'effector';

import { startSearchFx } from '../search';

interface Result {
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
}

const $results = createStore<Result[]>([]);

const now = new Date();

sample({
  source: startSearchFx,
  fn() {
    return [
      {
        origin: 'HKT',
        destination: 'JFK',
        departure: addHours(now, 1),
        arrival: addHours(now, 17),
      },
      {
        origin: 'HKT',
        destination: 'LED',
        departure: addHours(now, 1),
        arrival: addHours(now, 10),
      },
      {
        origin: 'MOW',
        destination: 'LED',
        departure: addHours(now, 4),
        arrival: addHours(now, 6),
      },
      {
        origin: 'MOW',
        destination: 'ABA',
        departure: addHours(now, 6),
        arrival: addHours(now, 11),
      },
      {
        origin: 'IKT',
        destination: 'BKK',
        departure: addHours(now, 4),
        arrival: addHours(now, 10),
      },
      {
        origin: 'HKT',
        destination: 'BKK',
        departure: addHours(now, 3),
        arrival: addHours(now, 4),
      },
      {
        origin: 'MOW',
        destination: 'BKK',
        departure: addHours(now, 5),
        arrival: addHours(now, 12),
      },
      {
        origin: 'LED',
        destination: 'JFK',
        departure: addHours(now, 3),
        arrival: addHours(now, 16),
      },
      {
        origin: 'JKF',
        destination: 'ABA',
        departure: addHours(now, 5),
        arrival: addHours(now, 20),
      },
      {
        origin: 'LED',
        destination: 'JFK',
        departure: addHours(now, 3),
        arrival: addHours(now, 16),
      },
      {
        origin: 'LED',
        destination: 'IKT',
        departure: addHours(now, 3),
        arrival: addHours(now, 8),
      },
      {
        origin: 'LED',
        destination: 'MOW',
        departure: addHours(now, 1),
        arrival: addHours(now, 2),
      },
      {
        origin: 'LED',
        destination: 'HKT',
        departure: addHours(now, 5),
        arrival: addHours(now, 11),
      },
    ];
  },
  target: $results,
});

export { $results, Result };
