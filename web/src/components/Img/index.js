import styled from 'styled-components';

export const Img = styled.picture`
  background-image: url(${({ src }) => src || ''});
  width: 75px;
  height: 75px;
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: var(--regim-box);
  margin: 10px;
`;
