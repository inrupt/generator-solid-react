import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ImageProfileWrapper,
  ButtonStyled,
  LoaderText,
  ImageProfileLoader
} from './image-profile.style';

type Props = {
  photo: String,
  overrideEventDefaults: () => void,
  onDragLeave: () => void,
  onDragEnter: () => void,
  onDrop: () => void,
  onClickFile: () => void,
  inProgress: boolean,
  uploadedFiles: Array<Object>,
  uploadingText: String,
  text: String
};

export const ImageProfile = (props: Props) => {
  const photo =
    props.uploadedFiles && props.uploadedFiles.length > 0
      ? props.uploadedFiles[props.uploadedFiles.length - 1].uri
      : props.photo;

  return (
    <ImageProfileWrapper
      {...{
        onDragStart: props.overrideEventDefaults,
        onDragOver: props.overrideEventDefaults,
        onDragEnd: props.overrideEventDefaults,
        onDrag: props.overrideEventDefaults,
        onDragLeave: props.onDragLeave,
        onDragEnter: props.onDragEnter,
        onDrop: props.onDrop,
        style: photo && photo !== '' && { backgroundImage: `url(${photo})` }
      }}
    >
      {/*photo && <img alt="Profile User" src={photo} /> */}

      <ButtonStyled onClick={props.onClickFile} className={'button-upload'}>
        <FontAwesomeIcon icon='upload' className='upload-icon' />
        {props.text}
      </ButtonStyled>
      {props.inProgress && (
        <ImageProfileLoader className={"image-profile-loader"}>
          <FontAwesomeIcon icon='spinner' spin size='2x' />
          <LoaderText>{props.uploadingText}</LoaderText>
        </ImageProfileLoader>
      )}
    </ImageProfileWrapper>
  );
};

ImageProfile.defaultProps = {
  text: 'Upload New Photo',
  uploadingText: 'Uploading'
};
