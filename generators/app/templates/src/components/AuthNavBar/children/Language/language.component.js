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
      <Flag className={`flag-icon flag-icon-${languages[language].icon}`} />
    </Dropdown>
  );
};

export default LanguageDropdown;
