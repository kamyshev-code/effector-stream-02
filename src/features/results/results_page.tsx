import { List } from 'antd';
import { format, Interval, isSameDay } from 'date-fns';
import { css } from '@linaria/core';
import { useList } from 'effector-react';

import { $filteredFlights } from '../filtered';

function formatDateTime(date: Date | number) {
  return format(date, 'yyyy.MM.dd HH:mm');
}

function formatTime(date: Date | number) {
  return format(date, 'HH:mm');
}

function formatInterval({ start, end }: Interval) {
  if (isSameDay(start, end)) {
    return `${formatDateTime(start)} — ${formatTime(end)}`;
  }

  return `${formatDateTime(start)} — ${formatDateTime(end)}`;
}

const containerClassName = css`
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 64px;
`;

export function ResultsPage() {
  const list = useList($filteredFlights, (result) => (
    <List.Item>
      <List.Item.Meta
        title={`из ${result.origin} в ${result.destination}`}
        description={`${formatInterval({
          start: result.departure,
          end: result.arrival,
        })}`}
      />
    </List.Item>
  ));

  return <List className={containerClassName}>{list}</List>;
}
