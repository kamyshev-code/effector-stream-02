import { Checkbox } from 'antd';
import { styled } from '@linaria/react';

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
      <Checkbox>Без ночных перелетов</Checkbox>
      <Checkbox>Только удобные</Checkbox>
      <Checkbox>Только быстрые</Checkbox>
    </Container>
  );
}
