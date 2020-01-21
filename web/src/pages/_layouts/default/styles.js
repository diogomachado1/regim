import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 1200px;
  max-width: 1200px;
  display: grid;
  grid-template-rows: 60px 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'header header' 'menu content';
  flex-direction: column;
  align-items: center;
  z-index: 100;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.1);
  > div {
    grid-area: content;
    width: 100%;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  height: 100%;
`;
