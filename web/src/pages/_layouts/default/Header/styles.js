import styled from 'styled-components';

export const HeaderContainer = styled.nav`
  grid-area: header;
  width: 100%;
  z-index: 100;
  height: 100%;
  padding: 0 10px;
  border: 1px solid #dedce1;
  background: #fff;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    > a > img {
      height: 35px;
    }
    > button {
      padding: 8px 10px;
      height: 40px;
    }
  }
`;
