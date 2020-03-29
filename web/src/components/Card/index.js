import React from 'react';
import { MdEdit, MdContentCopy } from 'react-icons/md';
import { FaRegTrashAlt, FaGlobeAmericas } from 'react-icons/fa';
import { CardContainer, Infos, Buttons } from './styles';
import TooltipButton from '../TooltipButton';
import Avatar from '../Avatar';

// import { Container } from './styles';

export default function Card({
  image,
  imageName,
  editAction,
  removeAction,
  duplicateAction,
  publicAction,
  isPublic,
  title,
  InfosProps,
  disabled,
}) {
  return (
    <CardContainer disabled={disabled}>
      <div>
        {imageName && (
          <Avatar className="regim-avatar" image={image} name={imageName} />
        )}
        <Infos>
          <span>{title}</span>
          <div>{InfosProps && <InfosProps />}</div>
        </Infos>
        <Buttons>
          {editAction && (
            <TooltipButton
              Icon={MdEdit}
              color="warning"
              action={() => editAction()}
              text="Editar"
            />
          )}
          {removeAction && (
            <TooltipButton
              Icon={FaRegTrashAlt}
              color="danger"
              action={() => removeAction()}
              text="Remover"
            />
          )}
          {duplicateAction && (
            <TooltipButton
              Icon={MdContentCopy}
              color="success"
              action={() => duplicateAction()}
              text="Duplicar"
            />
          )}
          {publicAction && (
            <TooltipButton
              Icon={FaGlobeAmericas}
              color={isPublic ? 'primary' : 'gray'}
              action={() => publicAction()}
              text="Tornar Público"
            />
          )}
        </Buttons>
      </div>
    </CardContainer>
  );
}
