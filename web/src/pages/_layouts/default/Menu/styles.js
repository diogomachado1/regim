import styled from 'styled-components';

export const MenuContainer = styled.aside`
  width: ${({ showMenu }) => (showMenu ? '250' : '0')}px;
  transition: width 0.5s ease-in-out;
  @keyframes menuAnimation {
    from {
      width: 0;
    }
    to {
      width: 250px;
    }
  }
  grid-area: menu;
  background: var(--regim-primary);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  box-shadow: 3px 0px 6px 0px rgba(0, 0, 0, 0.1);
  color: #fff;
  > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    > a {
      color: #fff;
      text-decoration: none;
      font-size: 18px;
      padding: 5px;
      cursor: pointer;
      :hover,
      &.active {
        background: #ffffff4c;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 250px;
  padding: 20px 30px;
  > span {
    font-weight: bold;
    font-size: 20px;
  }
  > a {
    margin-top: 5px;
    font-size: 14px;
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
