import React, { Component } from "react";
import { Dropdown } from "@util-components";
import { withToastManager } from 'react-toast-notifications';


const languages = {
  en: {
    id: "en",
    icon: "us"
  },
  es: {
    id: "es",
    icon: "es"
  },
  "en-US": {
    id: "en-US",
    icon: "us"
  }
};

class LanguageDropdown extends Component {
  constructor() {
    super();
    this.state = { language: this.getLanguage() };
  }

  getLanguage = () => localStorage.getItem("i18nextLng") || "en";

  onLanguageSelect = nextLanguage => {
    const { i18n, toastManager } = this.props;
    toastManager.toasts.forEach(toast=> toastManager.remove(toast.id))
    i18n.changeLanguage(nextLanguage);
    this.setState({
      language: this.getLanguage()
    });

  };
  render() {
    const { t } = this.props;
    const { language } = this.state;
    const profileOpts = [
      {
        label: t("navBar.languages.en"),
        onClick: () => this.onLanguageSelect("en"),
        icon: 'us',
        customIcon: true,
      },
      {
        label: t("navBar.languages.es"),
        onClick: () => this.onLanguageSelect("es"),
        icon: 'es',
        customIcon: true
      }
    ];
    return (
      <Dropdown actions={profileOpts} className="" hover={true}>
        <div
          className={`flag-icon flag-icon-${
            language && languages[language] ? languages[language].icon : "us"
          }`}
        />
      </Dropdown>
    );
  }
}

export default withToastManager(LanguageDropdown);
