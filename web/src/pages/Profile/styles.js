import styled from 'styled-components';

export const Container = styled.div`
  hr {
    border: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 10px 0 20px;
  }
  > form {
    display: flex;
    flex-direction: column;
    > * {
      margin: 10px 0;
    }
    > button {
      align-self: flex-end;
    }
  }
`;
