import styled from 'styled-components';

export const TextareaContainer = styled.label`
  > textarea {
    background: ${({ error }) => (error ? '#FEEFEE' : '#f5f4f6')};
    border: ${({ error }) => (error ? '1px solid #f95e5a' : 0)};
    border-radius: 5px;
    height: 50px;
    padding: 12px 20px;
    font-size: 20px;
    color: ${({ error }) => (error ? '#f95e5a' : '#170C3A')};
    width: 100%;
    height: 150px;
    resize: none;
    &::placeholder {
      color: ${({ error }) => (error ? '#f95e5a' : '#b1adb9')};
    }
  }
  > span {
    float: left;
    align-self: flex-end;
    font-size: 14px;
    color: #f95e5a;
  }
`;
