import React from 'react';
import { ThreeHorseLoading } from 'react-loadingg';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <ThreeHorseLoading />
    </Container>
  );
}
