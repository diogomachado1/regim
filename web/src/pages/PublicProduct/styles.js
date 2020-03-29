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
  .regim-public-product {
    > span:last-child {
      display: flex;
      align-items: center;
      margin-top: 5px;
      > div {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
  }
`;
export const ProductsList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > li + li {
    margin-top: 15px;
  }
`;
