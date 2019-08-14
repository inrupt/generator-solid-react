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
  uploadingText?: String,
  text?: String
};

export const ImageProfile = (props: Props) => {
  const {
    uploadedFiles,
    photo: img,
    overrideEventDefaults,
    onDragLeave,
    onDragEnter,
    onDrop,
    onClickFile,
    text,
    inProgress,
    uploadingText
  } = props;
  const photo =
    uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[uploadedFiles.length - 1].uri : img;

  return (
    <ImageProfileWrapper
      {...{
        onDragStart: overrideEventDefaults,
        onDragOver: overrideEventDefaults,
        onDragEnd: overrideEventDefaults,
        onDrag: overrideEventDefaults,
        onDragLeave,
        onDragEnter,
        onDrop,
        style: photo && photo !== '' && { backgroundImage: `url(${photo})` }
      }}
    >
      <ButtonStyled onClick={onClickFile} className="button-upload">
        <FontAwesomeIcon icon="upload" className="upload-icon" />
        {text}
      </ButtonStyled>
      {inProgress && (
        <ImageProfileLoader className="image-profile-loader">
          <FontAwesomeIcon icon="spinner" spin size="2x" />
          <LoaderText>{uploadingText}</LoaderText>
        </ImageProfileLoader>
      )}
    </ImageProfileWrapper>
  );
};

ImageProfile.defaultProps = {
  text: 'Upload New Photo',
  uploadingText: 'Uploading'
};
