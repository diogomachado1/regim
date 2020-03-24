import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 10px;
  max-height: 300px;
  &:hover {
    opacity: 0.7;
  }
  label {
    cursor: pointer;
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
  height: 300px;
  width: 100%;
  border-radius: 5px;
`;

export const DefaulImgContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
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
