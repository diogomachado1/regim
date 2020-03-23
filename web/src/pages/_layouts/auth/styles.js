import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(3, 27, 78, 0.1);
  display: flex;
  align-items: center;
  flex-direction: column;
  > img {
    width: 100px;
  }
  > span {
    margin-top: 10px;
  }
  form {
    display: flex;
    width: 300px;
    flex-direction: column;
    margin-top: 30px;
    > div + div {
      margin-top: 10px !important;
    }
    > button {
      margin-top: 20px;
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      align-self: flex-end;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
