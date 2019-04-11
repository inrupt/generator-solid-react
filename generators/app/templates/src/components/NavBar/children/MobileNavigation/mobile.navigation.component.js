import React from 'react';
import { LanguageDropdown } from "@util-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withTranslation } from "react-i18next";

import { TopNavigation } from './mobile.navigation.style';

const MobileNavigation = ({ children, toggleMobileMenu, isOpenMobile, t, i18n }) => {
    const isActive = isOpenMobile ? 'active slideLeft' : 'hidden';

    return (
        <section className={`mobile-navigation-panel ${isActive}`}>
            <div className="mobile-navigation-panel__wrap">
                <TopNavigation>
                  <LanguageDropdown {...{t, i18n}}/>
                  <div className="close-panel__toggle">
                      <button onClick={toggleMobileMenu}>
                          <FontAwesomeIcon className="icon" icon="times"/>
                      </button>
                  </div>
                </TopNavigation>
                {children}
            </div>
        </section>
    );
};

export default withTranslation()(MobileNavigation);

