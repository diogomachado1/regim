import styled from 'styled-components';
import { ButtonTerciaryCustom } from '~/components/Button/styles';

export const Container = styled.div`
  padding: 5px;
  align-self: flex-start;
`;

export const UlIngredients = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  > li {
    align-self: flex-start;
    background-color: #9a9df7;
    color: #fff;
    box-shadow: 0 0px 7px 0px #bbb;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    margin: 5px 0;
    align-items: center;
    > span.regim-ingredient-name {
      min-width: 70px;
      margin: 0 10px;
    }
    > div.regim-input-amount {
      display: flex;
      flex-direction: column;
      width: 150px;
      > div {
        margin-top: 0 !important;
      }
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
