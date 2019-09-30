import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const MealFormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
  > * + * {
    margin-top: 20px;
  }
  > div:last-child > {
    div {
      display: flex;
      justify-content: space-between;
      > button {
        width: calc(50% - 5px);
      }
    }
  }
`;
export const IngredientList = styled.ul`
  flex-grow: 1;
`;

export const ProductList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  margin-top: 20px;

  > li {
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 10px;
    min-width: 250px;
    > div {
      display: flex;
      align-items: center;
      > a {
        margin-right: auto;
        font-size: 20px;
      }
      > button {
        margin-left: 10px;
      }
    }
    > span {
      margin-top: 10px;
      display: flex;
    }
    > ul {
      list-style: none;
      width: 100%;
      display: flex;
      margin-top: 10px;
      flex-wrap: wrap;
      > li {
        margin-right: 5px;
      }
    }
  }
  > li + li {
    margin-top: 15px;
  }
`;
