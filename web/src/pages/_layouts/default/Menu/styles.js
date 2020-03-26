import styled from 'styled-components';

export const MenuContainer = styled.aside`
  width: ${({ showMenu }) => (showMenu ? '250' : '0')}px;
  transition: width 0.5s ease-in-out;
  @media screen and (max-width: 900px) {
    position: absolute;
    top: 60px;
    height: calc(100% - 60px);
    z-index: 300;
  }
  height: 100%;

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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100;
  box-shadow: var(--regim-box);
  color: #fff;
  > ul {
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    list-style: none;
    min-width: 250px;
    > a {
      color: #fff;
      flex-shrink: 0;
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
  > :first-child {
    width: 75px;
    height: 75px;
    margin: 10px;
  }
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

export const Img = styled.picture`
  background-image: url(${({ src }) => src || ''});
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: var(--regim-box);
  margin: 10px;
`;
