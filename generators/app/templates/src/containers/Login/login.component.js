/* eslint-disable constructor-super */
import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ProviderLogin } from "@inrupt/solid-react-components";
import {
  LoginWrapper,
  LoginPanel,
  PanelBody,
  LoginTitle
} from "./login.style.js";
import { CenterContainer } from "@util-components";

const LoginComponent = props => {
  const { t } = props;
  return (
    <LoginWrapper>
      <CenterContainer>
        <h1>{t("login.title")}</h1>
        <LoginPanel>
          <PanelBody>
            <Link
              className="ids-link-filled ids-link-filled--primary"
              to="/register"
            >
              {t("login.register")}
            </Link>
            <a
              href="https://solid.inrupt.com/get-a-solid-pod"
              rel="noopener noreferrer"
              target="_blank"
              className="link"
            >
              {t("login.solidHelp")}
            </a>
            <LoginTitle> {t("login.loginTitle")}</LoginTitle>
            <ProviderLogin
              selectPlaceholder={t("login.selectPlaceholder")}
              inputPlaholder={t("login.inputPlaholder")}
              formButtonText={t("login.formButtonText")}
              btnTxtWebId={t("login.btnTxtWebId")}
              btnTxtProvider={t("login.btnTxtProvider")}
              className="provider-login-component"
              callbackUri={`${window.location.origin}/welcome`}
            />
          </PanelBody>
        </LoginPanel>
      </CenterContainer>
    </LoginWrapper>
  );
};

export { LoginComponent };

export default withTranslation()(LoginComponent);
