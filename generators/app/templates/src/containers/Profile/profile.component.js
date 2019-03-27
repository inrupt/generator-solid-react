
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isLoading from '@hocs/isLoading';
import { Uploader } from '@inrupt/solid-react-components';
import { Input } from '@util-components';
import { ImageProfile } from '@components';
import { useTranslation } from 'react-i18next'
import {
  ProfileWrapper,
  ProfileContainer,
  FullGridSize,
  Button,
  Header,
  Form,
  WebId, ShapeSelect
} from "./profile.style";

type Props = {
  webId: String,
  photo: String,
  formFields: Array<Array>,
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
  const { t } = useTranslation();

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
              <FontAwesomeIcon icon='pencil-alt' /> {t('profile.edit')}
            </button>
          )}
          <Uploader
            {...{
              fileBase: webId && webId.split('/card')[0],
              limitFiles: 1,
              limitSize: 2100000,
              accept: 'png,jpg,jpeg',
              errorsText: {
                sizeLimit: t('profile.errors.sizeLimit'),
                unsupported: t('profile.errors.unsupported'),
                maximumFiles: t('profile.errors.maximumFiles')
              },
              onError: error => {
                if (error && error.statusText) {
                  toastManager.add(['', error.statusText], {
                    appearance: 'error'
                  });
                }
              },
              onComplete: uploadedFiles => {
                updatePhoto(uploadedFiles[0].uri, t('profile.uploadSuccess'))
              },
              render: props => <ImageProfile {...{ ...props, webId, photo, text: t('profile.upload'),
                uploadingText: t('profile.uploadingText') }} />
            }}
          />
        </Header>
        <Form onSubmit={(e) => onSubmit(e,t('profile.updateSuccess'))}>
          {formFields &&
            formFields.map(fields => (

              <span>
                {fields && fields.expressions.map(item =>
                  item.valueExpr.values ? (

                  <ShapeSelect type="dropdown"
                    placeholder={t(`profile.${item.key}`)}
                    key={item.key}
                    id={item.key}
                    name={item.nodeBlank || item.property}
                    onChange={onInputChange}
                    value={item.value}
                    onInvalid={(e) => e.target.setCustomValidity(t('profile.nameRequired'))}
                    onInput={(e) => e.target.setCustomValidity('')}
                    data-nodeparenturi={item.nodeParentUri}
                    data-nodeblank={item.nodeBlank}
                    data-label={item.label}
                    data-icon={item.icon}
                    data-datatype={item.dataType}
                    data-subject={item.subject}>

                    <option></option>
                      {item.valueExpr.values.map(opt =>
                        <option value={opt} name={item.key + 'opts'}>{opt.toString().split('#')[1]}</option>
                      )}

                  </ShapeSelect>

                  ) : (
                  <Input
                    key={item.key}
                    id={item.key}
                    placeholder={t(`profile.${item.key}`)}
                    name={item.nodeBlank || item.property}
                    value={getProfileValue(updatedFields, item)}
                    onChange={onInputChange}
                    icon={item.icon}
                    readOnly={formMode}
                    pattern={item.pattern}
                    required={item.required}
                    data-nodeparenturi={item.nodeParentUri}
                    data-nodeblank={item.nodeBlank}
                    data-label={item.label}
                    data-icon={item.icon}
                    data-subject={item.subject}
                    data-datatype={item.dataType}
                    data-prefix={item.prefix}
                    type={'text'}
                    onInvalid={(e) => e.target.setCustomValidity(t('profile.nameRequired'))}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                ))}
                {fields.hasMultiple && (
                  <button> + </button>
                )}
              </span>
            ))}
          <FullGridSize>
            {!formMode && (
              <>
                <Button
                  type='button'
                  onClick={onCancel}
                  className='ids-link-stroke ids-link-stroke--primary'
                >
                  {t('profile.cancelBtn')}
                </Button>
                <Button
                  type='submit'
                  className='ids-link-filled ids-link-filled--primary'
                >
                  {t('profile.saveBtn')}
                </Button>
              </>
            )}
          </FullGridSize>
        </Form>
        {formMode && (
          <WebId>
            <FontAwesomeIcon icon='id-card' />
            <a href={webId} target='_blank' rel='noopener noreferrer'>
              {webId}
            </a>
          </WebId>
        )}
      </ProfileContainer>
    </ProfileWrapper>
  )
}

export default isLoading(ProfileComponent)
