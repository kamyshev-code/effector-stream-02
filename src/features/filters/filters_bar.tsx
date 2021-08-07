/* eslint-disable no-use-before-define */

import { ReactNode } from 'react';
import { Checkbox } from 'antd';
import { styled } from '@linaria/react';
import { useStore } from 'effector-react';

import {
  onlyConvinientFlightsFilter,
  onlyFastFlightsFilter,
  noOvernightFlightsFilter,
} from './filters';
import { Filter } from './lib';

const Container = styled.section`
  display: flex;
  flex-direction: row;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 32px;
  align-items: center;
  justify-content: center;
`;

export function FiltersBar() {
  return (
    <Container>
      <FilterCheckbox filter={noOvernightFlightsFilter}>
        Без ночных перелетов
      </FilterCheckbox>
      <FilterCheckbox filter={onlyConvinientFlightsFilter}>
        Только удобные
      </FilterCheckbox>
      <FilterCheckbox filter={onlyFastFlightsFilter}>
        Только быстрые
      </FilterCheckbox>
    </Container>
  );
}

function FilterCheckbox({
  filter,
  children,
}: {
  filter: Filter;
  children: ReactNode;
}) {
  const active = useStore(filter.$active);
  const disabled = useStore(filter.$disabled);

  return (
    <Checkbox
      checked={active}
      disabled={disabled}
      onChange={({ target }) => {
        if (target.checked) {
          filter.activate({ ctx: 'result_page' });
        } else {
          filter.deactivate();
        }
      }}
    >
      {children}
    </Checkbox>
  );
}
