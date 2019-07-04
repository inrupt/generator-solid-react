import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShexFormBuilder } from '@inrupt/solid-react-components';
import { successToaster, errorToaster } from '@utils';
import {
  Header,
  ProfileContainer,
  ProfileWrapper,
  ShexForm,
  AutoSaveNotification,
  WebId
} from './profile.style';
import { Image } from './components';

const defaultProfilePhoto = '/img/icon/empty-profile.svg';

/**
 * We are using ldflex to fetch profile data from a solid pod.
 * ldflex libary is using json-LD for this reason you will see async calls
 * when we want to get a field value, why ? becuase they are expanded the data
 * this means the result will have a better format to read on Javascript.
 * for more information please go to: https://github.com/solid/query-ldflex
 */
type Props = { webId: String };

const Profile = ({ webId }: Props) => {
  const { t, i18n } = useTranslation();

  const successCallback = () => {
    successToaster(t('profile.successCallback'), t('profile.successTitle'));
  };

  const errorCallback = e => {
    const code = e.code || e.status;
    const messageError = code ? `profile.errors.${code}` : 'profile.errors.default';
    if (code && code !== 200) {
      errorToaster(t(messageError), 'Error');
    }
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

            <ShexForm>
              <WebId>
                <FontAwesomeIcon icon="id-card" />
                <a href={webId} target="_blank" rel="noopener noreferrer">
                  {webId}
                </a>
              </WebId>
              <ShexFormBuilder
                {...{
                  documentUri: webId,
                  shexUri: 'https://shexshapes.inrupt.net/public/userprofile.shex',
                  theme: {
                    form: 'shexForm',
                    shexPanel: 'shexPanel',
                    shexRoot: 'shexRoot',
                    deleteButton: 'deleteButton ids-button-stroke ids-button-stroke--secondary',
                    inputContainer: 'inputContainer',
                    addButtonStyle: 'addButton ids-button-stroke ids-button-stroke--secondary'
                  },
                  languageTheme: {
                    language: i18n.language.substring(0, 2),
                    saveBtn: t('profile.saveBtn'),
                    resetBtn: t('profile.resetBtn'),
                    addButtonText: t('profile.addBtn'),
                    deleteButton: t('profile.deleteBtn'),
                    dropdownDefaultText: t('profile.dropdownDefaultText'),
                    warningResolution: t('profile.warningResolution'),
                    formValidate: {
                      minMxNumberInclusive: t('profile.minMxNumberInclusive'),
                      minMxNumberExclusive: t('profile.minMxNumberExclusive'),
                      minMaxString: t('profile.minMaxString'),
                      default: t('profile.defaultError')
                    }
                  },
                  successCallback,
                  errorCallback,
                  autoSaveMode: true
                }}
              />
            </ShexForm>
          </Fragment>
        )}
      </ProfileContainer>
    </ProfileWrapper>
  );
};

export default Profile;
