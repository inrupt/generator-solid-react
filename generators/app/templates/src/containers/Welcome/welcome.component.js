import React from "react";
import { LogoutButton, Uploader } from "@inrupt/solid-react-components";
import isLoading from "@hocs/isLoading";
import { Trans, withTranslation } from "react-i18next";
import {
  WelcomeWrapper,
  WelcomeCard,
  WelcomeLogo,
  WelcomeProfile,
  WelcomeDetail,
  ImageWrapper
} from "./welcome.style";
import { withToastManager } from "react-toast-notifications";
import { ImageProfile } from "@components";

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
const WelcomePageContent = props => {
  const { webId, image, updatePhoto, toastManager, name, t } = props;

  return (
    <WelcomeWrapper>
      <WelcomeCard className="card">
        <WelcomeLogo>
          <img src="/img/logo.svg" alt="Inrupt" />
        </WelcomeLogo>
        <WelcomeProfile>
          <h3>
            {t("welcome.welcome")}, <span>{name}</span>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split("/card")[0],
                limitFiles: 1,
                limitSize: 2100000,
                accept: "image/*",
                onError: error => {
                  if (error && error.statusText) {
                    toastManager.add(["", error.statusText], {
                      appearance: "error"
                    });
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(uploadedFiles[0].uri);
                },
                render: props => (
                  <ImageProfile {...{ ...props, webId, photo: image }} />
                )
              }}
            />
          </ImageWrapper>
          <p>
            {t("welcome.doneMessage")}{" "}
            <LogoutButton>{t("navBar.logOut")}</LogoutButton>
          </p>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail>
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href="https://github.com/Inrupt-inc/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="welcome.description">
            <p>
              text
              <a
                href="https://github.com/Inrupt-inc/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link{" "}
              </a>{" "}
              text
            </p>
          </Trans>
          <Trans i18nKey="welcome.libraryList">
            <ul>
              <li>
                <a
                  href="https://github.com/Inrupt-inc/solid-react-components"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reusable Components
                </a>
                that you can use on your own in the applications that you build.
              </li>
              <li>
                <a
                  href="https://github.com/Inrupt-inc/generator-solid-react"
                  target="_blank"
                  rel="noopener noreferrer"
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

          <Trans i18nKey="welcome.evolvingMessage">
            <p>
              The SDK is continually evolving. Take a look at the
              <a
                href="https://github.com/Inrupt-inc/solid-react-sdk/tree/master#release-timeline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Release Timeline{" "}
              </a>
              for what’s currently planned. This latest release builds on the
              prior version, fixing some bugs and improving the general
              developer experience.
            </p>
          </Trans>
          <Trans i18nKey="welcome.version010">
            <ul>
              <li>
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk/blob/master/README.md#user-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  User Registration
                </a>
                for a Solid Pod.
              </li>
              <li>
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk/blob/master/README.md#user-authentication"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  User Authentication
                </a>
                against user selected Providers.
              </li>
              <li>
                Use of an{" "}
                <a
                  href="http://design.inrupt.com/atomic-core/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Atomic Style Guide{" "}
                </a>{" "}
                that you can use to{" "}
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk/blob/master/README.md#design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  style{" "}
                </a>{" "}
                your applications.
              </li>
              <li>
                Infrastructure and applied best practices for{" "}
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk#error-handling"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Error Handling
                </a>{" "}
                ,
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk#test-infrastructure"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Testing
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/Inrupt-inc/solid-react-sdk#accessibility"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Accessibility
                </a>{" "}
                .
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
