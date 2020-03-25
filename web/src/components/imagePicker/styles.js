import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: 300px;
  &:hover {
    opacity: 0.7;
  }
  label {
    cursor: pointer;
    height: 100%;

    width: 100%;
    display: flex;
    img {
      border-radius: 5px;
      height: 300px;
    }
    input {
      display: none;
    }
  }
`;

export const DefaulImg = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 5px;
  display: flex;
`;

export const DefaulImgContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  > span {
    color: #fff !important;
    align-self: auto !important;
  }
`;

export const Img = styled.picture`
  background-image: url(${({ src }) => src || ''});
  width: 100%;
  border-radius: 5px;
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
