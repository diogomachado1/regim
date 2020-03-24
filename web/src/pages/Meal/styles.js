import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  a {
    text-decoration: none;
  }
  > a {
    margin-left: auto;
  }
`;
export const MealsList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  > li {
    box-shadow: var(--regim-box);
    border-radius: 5px;
    padding: 10px;

    > div {
      display: flex;
      align-items: center;
      > span {
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
