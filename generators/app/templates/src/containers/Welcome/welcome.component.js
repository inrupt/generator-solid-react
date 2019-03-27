import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import isLoading from '@hocs/isLoading';
import { Trans, withTranslation } from 'react-i18next';
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
  ImageWrapper
} from './welcome.style';
import { withToastManager } from 'react-toast-notifications';
import { ImageProfile } from '@components';

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
const WelcomePageContent = props => {
  const { webId, image, updatePhoto, toastManager, name, t } = props;
  const limit = 2100000;
  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="/img/logo.svg" alt="Inrupt" />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t('welcome.welcome')}, <span>{name}</span>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('welcome.errors.sizeLimit', {limit: `${limit/1000000}Mbs`}),
                  unsupported: t('welcome.errors.unsupported'),
                  maximumFiles: t('welcome.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    toastManager.add(['', error.statusText], {
                      appearance: 'error'
                    });
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(uploadedFiles[0].uri, t('welcome.uploadSuccess'));
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('welcome.upload'),
                      uploadingText: t('welcome.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href='https://github.com/Inrupt-inc/solid-react-sdk'
                target='_blank'
                rel='noopener noreferrer'
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey='welcome.description'>
            <p>
              text
              <a
                href='https://github.com/Inrupt-inc/solid-react-sdk'
                target='_blank'
                rel='noopener noreferrer'
              >
                link{' '}
              </a>{' '}
              text
            </p>
          </Trans>
          <Trans i18nKey='welcome.libraryList'>
            <ul>
              <li>
                <a
                  href='https://github.com/Inrupt-inc/solid-react-components'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Reusable Components
                </a>
                that you can use on your own in the applications that you build.
              </li>
              <li>
                <a
                  href='https://github.com/Inrupt-inc/generator-solid-react'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Application Generator
                </a>
                that incorporates all of the components and best practices
                together for you, standing up THIS fully functional Solid React
                application. Note: The Solid React application illustrates the
                use of the components installed by the Generator. It should not
                be considered as a service provided by inrupt, and is subject to
                change.
              </li>
              <li>
                Best practice patterns that you can reference as examples of how
                to accomplish particular things.
              </li>
            </ul>
          </Trans>

          <Trans i18nKey='welcome.evolvingMessage'>
            <p>
              The SDK is continually evolving. Take a look at the
              <a
                href='https://github.com/Inrupt-inc/solid-react-sdk/tree/master#release-timeline'
                target='_blank'
                rel='noopener noreferrer'
              >
                Release Timeline
              </a>
              for what’s been implemented as part of the previous releases, and
              what's currently planned.
            </p>
          </Trans>
          <p>{t('welcome.implementing')}</p>
          <Trans i18nKey='welcome.version030'>
            <ul>
              <li>
                Implementing the ability to view and edit your
                <a
                  href='https://github.com/Inrupt-inc/solid-react-sdk#user-profile'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  User Profile
                </a>
              </li>
              <li>
                Including an Application Footer that displays the build number
                and links to resources
              </li>
              <li>
                Addressing several minor issues based on user feedback.
              </li>
            </ul>
          </Trans>
        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};

export { WelcomePageContent };
export default withTranslation()(
  isLoading(withToastManager(WelcomePageContent))
);
