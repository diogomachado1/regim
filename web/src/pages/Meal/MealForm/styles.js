import styled from 'styled-components';

import { Form } from '@rocketseat/unform';

export const StyledForm = styled(Form)`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    > * {
      margin-bottom: 10px;
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
