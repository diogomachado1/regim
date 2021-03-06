import styled from 'styled-components';

export const StyledForm = styled.form`
  min-height: 100%;
  height: 100%;
  max-height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: 100%;
    max-height: calc(100% - 20px);
    > * {
      margin-bottom: 10px;
    }
    > div.scrollbar-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      max-height: 100%;
      > * {
        margin-bottom: 10px;
        margin-top: 5px !important;
      }
      > .regim-date-group {
        display: flex;
        > * {
          :first-child {
            margin-right: 10px;
          }
          margin: 0;
          flex: 1;
        }
      }
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
