import React from 'react';
import { Avatar as AvatarMd } from '@material-ui/core';
import getInitialLettes from '~/utils/getInitialLetters';

// import { Container } from './styles';

export default function Avatar({ image, name }) {
  return (
    <>
      {image ? (
        <AvatarMd src={image.url} alt={name} />
      ) : (
        <AvatarMd>{getInitialLettes(name)}</AvatarMd>
      )}
    </>
  );
}
