import React from "react";
import { Dropdown } from "@util-components";
import styled from "styled-components";

const Flag = styled.div`
  height: 100%;
  width: auto;
`;

const LanguageDropdown = ({ language, onLanguageSelect, t }) => {
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

  const profileOpts = [
    {
      label: t("navBar.languages.en"),
      onClick: () => onLanguageSelect("en")
    },
    {
      label: t("navBar.languages.es"),
      onClick: () => onLanguageSelect("es")
    }
  ];

  return (
    <Dropdown actions={profileOpts} className="" hover={true}>
      <Flag
        className={`flag-icon flag-icon-${
          language && languages[language] ? languages[language].icon : "en"
        }`}
      />
    </Dropdown>
  );
};

export default LanguageDropdown;
