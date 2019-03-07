
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isLoading from '@hocs/isLoading';
import { Uploader } from '@inrupt/solid-react-components';
import { Input } from '@util-components';
import { ImageProfile } from '@components';
import {
  ProfileWrapper,
  ProfileContainer,
  FullGridSize,
  Button,
  Header,
  Form,
  WebId
} from './profile.style';

type Props = {
  webId: String,
  photo: String,
  formFields: Array<Object>,
  updatedFields: Object,
  changeFormMode: () => void,
  onInputChange: () => void,
  onSubmit: () => void,
  onCancel: () => void,
  updatePhoto: (uri: String) => void,
  toastManager: (message: String, options: Object) => void,
  formMode: boolean
}


function getProfileValue(updatedFields: Object, item: Object) {
  const currentKey = item.nodeBlank || item.property;
  if (updatedFields[currentKey]) {
    if (
      updatedFields[currentKey].value ||
      updatedFields[currentKey].value === ''
    )
      return updatedFields[currentKey].value;
  }
  return item.value || '';
}

const ProfileComponent = ({
  webId,
  formFields,
  changeFormMode,
  onInputChange,
  updatePhoto,
  toastManager,
  onSubmit,
  onCancel,
  formMode,
  updatedFields,
  photo
}: Props) => {
  return (
    <ProfileWrapper data-testid="profile-component">
      <ProfileContainer>
        <Header>
          {formMode && (
            <button
              type='button'
              className='button edit-button'
              onClick={changeFormMode}
              data-testid="edit-profile-button"
            >
              <FontAwesomeIcon icon='pencil-alt' /> EDIT
            </button>
          )}
          <u></u>
        </Header>
        <F></F>
      </ProfileContainer>
    </ProfileWrapper>
  )
}

export default isLoading(ProfileComponent)
