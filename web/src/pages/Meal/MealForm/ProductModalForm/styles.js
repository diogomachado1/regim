import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled(Form)`
  max-height: 400px;
  width: 300px;
  background-color: #fff;
  z-index: 304;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 15px;
  border-radius: 5px;
  > * {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  > select {
    background-color: #fff;
    border: 2px solid #c4c4c4;
    border-radius: 5px;
    height: 50px;
    padding: 12px 20px;
    font-size: 20px;
  }
`;

export const ContainerShadow = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 300;
`;

export const Shadow = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0006;
  top: 0;
  left: 0;
  z-index: 301;
`;
