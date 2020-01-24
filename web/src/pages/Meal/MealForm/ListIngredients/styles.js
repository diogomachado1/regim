import styled from 'styled-components';
import { ButtonTerciaryCustom } from '~/components/Button/styles';

export const Container = styled.div`
  flex: 1;
  border: 2px solid #c4c4c4;
  border-radius: 5px;
  padding: 5px 10px;
`;

export const UlIngredients = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  > li {
    background-color: #fafafa;
    box-shadow: 0 0px 7px 0px #bbb;
    padding: 10px 20px;
    border-radius: 25px;
    display: flex;
    margin: 5px 0;
    justify-content: flex-end;
    align-items: center;
    > :first-child {
      margin-right: auto;
    }
    > input {
      height: 35px;
      padding: 5px;
      font-size: 14px;
    }
  }
`;

export const CloseButton = styled(ButtonTerciaryCustom).attrs(_ => ({
  color: 'danger',
  type: 'button',
}))`
  border-radius: 50%;
  padding: 5px;
  height: 35px;
  width: 35px;
  margin-left: 10px;
  box-shadow: 0 0px 7px 0px #bbb;
`;
