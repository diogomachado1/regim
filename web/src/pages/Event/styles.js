import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;
  a {
    text-decoration: none;
  }
  > a {
    margin-top: 10px;
    margin-left: auto;
  }
`;
export const EventsList = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  > div {
    display: flex;
    flex-direction: column;
    > span {
      font-size: 18px;
      align-self: center;
      color: #666;
    }
    > * + * {
      margin-top: 15px;
    }
  }
  > div + div {
    margin-top: 15px;
  }
`;

export const EventItem = styled.li`
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  opacity: ${({ lasted }) => (lasted ? '0.4' : '1')};
  > div {
    display: flex;
    align-items: center;
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

export const Pagination = styled.div`
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
  position: sticky;
  width: calc(100% + 40px);
  top: -20px;
  margin-top: -20px;
  margin-left: -20px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 200;
  > span {
    color: #666;
    margin: 0 10px;
  }
`;
