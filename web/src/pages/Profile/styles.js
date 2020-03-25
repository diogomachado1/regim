import styled from 'styled-components';

export const Container = styled.div`
  hr {
    border: 0;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    margin: 10px 0 20px;
  }
  > form {
    > div:first-child {
      width: 200px;
      height: 200px;
      display: flex;
      picture {
        width: 100%;
        border-radius: 50%;
        box-shadow: var(--regim-box);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
      }
    }
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
