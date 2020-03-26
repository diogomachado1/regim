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
