import styled from 'styled-components';

export const StyledForm = styled.form`
  min-height: 100%;
  height: 100%;
  max-height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  flex: 1;
  > div {
    &:first-child {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: stretch;
      flex: 1;
    }
    > div:first-child {
      width: 300px;
      height: 400px;
    }
    > div + div {
      margin: 10px 0;
    }
  }
`;
export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > button {
    width: calc(50% - 5px);
  }
`;
