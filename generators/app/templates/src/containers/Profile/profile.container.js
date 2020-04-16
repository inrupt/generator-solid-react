import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormModel } from '@inrupt/solid-react-components';
import { successToaster, errorToaster, languageHelper } from '@utils';
import { Loader } from '@util-components';
import {
  Header,
  ProfileContainer,
  ProfileWrapper,
  AutoSaveNotification,
  WebId
} from './profile.style';
import { FormWrapper } from '../FormModel/form-model.style';
import { Image } from './components';
import { AutoSaveSpinner } from '@components';

const defaultProfilePhoto = '/img/icon/empty-profile.svg';
const language = languageHelper.getLanguageCode();

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */
type Props = { webId: String };

const Profile = ({ webId }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onError = e => {
    if (e.message.toString().indexOf('Validation failed') < 0) {
      errorToaster(t('formLanguage.renderer.formNotLoaded'), t('notifications.error'), {
        label: t('errorFormRender.link.label'),
        href: t('errorFormRender.link.href')
      });
      setIsLoading(false);
    }
  };

  const onDelete = () => {
    successToaster(t('formLanguage.renderer.fieldDeleted'), t('notifications.success'));
  };

  const onAddNewField = () => {
    successToaster(t('formLanguage.renderer.fieldAdded'), t('notifications.success'));
  };

  return (
    <ProfileWrapper data-testid="profile-component">
      <ProfileContainer>
        {webId && (
          <Fragment>
            <Header>
              <Image
                {...{
                  webId,
                  defaultProfilePhoto
                }}
              />
            </Header>

            <AutoSaveNotification className="banner-wrap--warning banner">
              <div className="banner-wrap__content">
                <i className="icon fa fa-exclamation-circle" />
                {t('profile.autosaveNotification')}
              </div>
            </AutoSaveNotification>

            <WebId>
              <FontAwesomeIcon icon="id-card" />
              <a href={webId} target="_blank" rel="noopener noreferrer">
                {webId}
              </a>
            </WebId>
            <FormWrapper>
              <FormModel
                {...{
                  modelSource: 'https://solidsdk.inrupt.net/sdk/userprofile.ttl#formRoot',
                  dataSource: webId,
                  viewer: false,
                  onInit: () => {
                    setIsLoading(true);
                  },
                  onLoaded: () => {
                    setIsLoading(false);
                  },
                  onSuccess: () => {},
                  onSave: () => {},
                  onError: error => {
                    onError(error);
                  },
                  onAddNewField: response => onAddNewField(response),
                  onDelete: response => onDelete(response),
                  options: {
                    theme: {
                      inputText: 'input-wrap',
                      inputCheckbox: 'sdk-checkbox checkbox',
                      form: 'inrupt-sdk-form',
                      childGroup: 'inrupt-form-group',
                      groupField: 'group-wrapper',
                      multipleField: 'multiple-wrapper'
                    },
                    autosave: true,
                    autosaveIndicator: AutoSaveSpinner,
                    language
                  }
                }}
                liveUpdate
              />
            </FormWrapper>
          </Fragment>
        )}
        {isLoading && <Loader absolute />}
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default Profile;
