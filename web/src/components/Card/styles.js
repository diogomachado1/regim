import styled from 'styled-components';

export const CardContainer = styled.li`
  box-shadow: var(--regim-box);
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
  > div {
    display: flex;
    align-items: center;
    > div.regim-avatar {
      height: 75px;
      width: 75px;
      margin-right: 10px;
      box-shadow: var(--regim-box);
      > img {
        height: 75px;
        width: 75px;
      }
    }
    > span {
      margin-right: auto;
      font-size: 20px;
    }

    > button {
      margin-left: 10px;
    }
  }
  > span {
    margin-top: 10px;
    display: flex;
  }
  > ul {
    list-style: none;
    width: 100%;
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    > li {
      margin-right: 5px;
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: stretch;

  > * {
    margin: 5px;
  }
`;

export const Infos = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  > span {
    font-size: 20px;
  }
  > div > span {
    font-size: 14px;
    font-weight: 100;
    opacity: 0.7;
  }
`;
