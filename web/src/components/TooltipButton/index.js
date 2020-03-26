import React from 'react';
import { Tooltip } from '@material-ui/core';
import { CircleButton } from '../Button/styles';

// import { Container } from './styles';

export default function TooltipButton({ text, color, Icon, action }) {
  return (
    <Tooltip title={text} aria-label={text} placement="top">
      <CircleButton onClick={() => action()} color={color}>
        <Icon size="18" />
      </CircleButton>
    </Tooltip>
  );
}
