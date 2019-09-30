import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';

export const Inputbox = styled(DebounceInput)`
  background: ${({ error }) => (error ? '#FEEFEE' : '#fff')};
  border: ${({ error }) => (error ? '2px solid #f95e5a' : '2px solid #C4C4C4')};
  border-radius: 5px;
  height: 50px;
  padding: 12px 20px;
  padding-left: ${({ icon }) => (icon ? '40px' : '20px')};
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  color: ${({ error }) => (error ? '#f95e5a' : '#170C3A')};
  &::placeholder {
    color: ${({ error }) => (error ? '#f95e5a' : '#b1adb9')};
  }
`;

export const InputboxUnform = styled.input`
  background: ${({ error }) => (error ? '#FEEFEE' : '#fff')};
  border: ${({ error }) => (error ? '2px solid #f95e5a' : '2px solid #C4C4C4')};
  border-radius: 5px;
  height: 50px;
  padding: 12px 20px;
  padding-left: ${({ icon }) => (icon ? '40px' : '20px')};
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  color: ${({ error }) => (error ? '#f95e5a' : '#170C3A')};

  &::placeholder {
    color: ${({ error }) => (error ? '#f95e5a' : '#b1adb9')};
  }
`;

export const Container = styled.span`
  position: relative;
  > div > div > svg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 16px;
    left: 15px;
    g * {
      stroke: ${({ error }) => (error ? '#f95e5a' : '#b1adb9')};
    }
  }
`;

export const Checkboxbox = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 20px;
  margin: 5px 10px;
  cursor: pointer;
  font-size: 20px;
  > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  > span {
    position: absolute;
    top: 13px;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: #eee;
    border-radius: 3px;
    :after {
      content: '';
      position: absolute;
      display: none;
    }
  }
  :hover input ~ span {
    background-color: #ccc;
    border-radius: 3px;
  }
  & input:checked ~ span {
    background-color: var(--primary-normal-color);
    border-radius: 3px;
  }
  input:checked ~ span:after {
    display: block;
  }

  & span:after {
    left: 4px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const SpanError = styled.span`
  float: left;
  align-self: flex-end;
  font-size: 14px;
  color: #f95e5a;
`;
