import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  margin: 0 -20px;
  width: calc(100% + 40px);
  border-top: 1px solid #c4c4c4aa;
  box-shadow: 0 -5px 7px -3px #888;
  position: relative;
`;

export const AddButtonContainer = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  z-index: 200;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 -5px 7px -3px #888;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 0;
  }
`;

export const DivProducts = styled.ul`
  display: flex;
  list-style: none;
  padding: 0 20px;
  height: 100%;
  align-items: center;
  overflow-x: auto;
  > div {
    display: flex;
    height: 100%;
    align-items: center;
    overflow-x: auto;
    > li {
      flex-shrink: 0;
      margin-right: 10px;
      background-color: #fafafa;
      box-shadow: 0 0px 7px 0px #bbb;
      padding: 0px;
      border-radius: 25px;
      > button {
        background-color: #fafafa;
        border-radius: 25px;
        border: none;
        font-size: 18px;
        font-weight: 600;
        color: #777;
        display: flex;
        align-items: center;
        > span:first-child {
          height: 35px;
          width: 35px;
          margin-left: 5px;
          border-radius: 50%;
          background-color: #fafafa;
          border: 1px solid #c4c4c488;
          &.actived {
            background-color: #53a687;
          }
        }
        > span:last-child {
          padding: 15px 20px 15px 10px;
        }
      }
    }
  }
`;
