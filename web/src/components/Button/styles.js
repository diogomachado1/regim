import styled from 'styled-components';

export const ButtonCustom = styled.button`
  height: 40px;
  padding: 0 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(${({ color }) => `--${color || 'primary'}`}-normal-color);
  color: #fff;
  border: 0;
  text-align: center;
  border-radius: 5px;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: var(${({ color }) => `--${color || 'primary'}`}-dark-color);
  }

  > div {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    > div > svg {
      width: 20px;
      height: 20px;
      g * {
        stroke: #fff;
        stroke-width: 5px;
      }
    }
  }
`;

export const ButtonTerciaryCustom = styled.button`
  height: 35px;
  padding: 6px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(
    ${({ color }) => `--${color || 'primary'}`}-mostLightest-color
  );
  color: var(${({ color }) => `--${color || 'primary'}`}-normal-color);
  border: 0;
  text-align: center;
  border-radius: 5px;
  font-size: 18px;
  transition: background 0.3s;

  &:hover {
    background: var(${({ color }) => `--${color || 'primary'}`}-lightest-color);
  }

  > div {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    > div > svg {
      width: 20px;
      height: 20px;
      g * {
        stroke: var(${({ color }) => `--${color || 'primary'}`}-normal-color);
        stroke-width: 5px;
      }
    }
  }
`;

export const ButtonQuartiaryCustom = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00000000;
  font-weight: bold;
  color: var(${({ color }) => `--${color || 'primary'}`}-normal-color);
  border: 0;
  text-align: center;
  border-radius: 5px;
  font-size: 18px;
  transition: background 0.3s;
  > div {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    > div > svg {
      width: 20px;
      height: 20px;
      g * {
        stroke: var(${({ color }) => `--${color || 'primary'}`}-normal-color);
        stroke-width: 5px;
      }
    }
  }
`;

export const PagButton = styled(ButtonTerciaryCustom).attrs(_ => ({
  type: 'button',
}))`
  border-radius: 50%;
  padding: 5px;
  height: 30px;
  width: 30px;
  box-shadow: 0 0px 4px 0px #ccc;
`;
