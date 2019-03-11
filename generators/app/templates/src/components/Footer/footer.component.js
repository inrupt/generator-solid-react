import React from 'react';
import { IconLookup, IconDefinition, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {

  const githubIcon: IconLookup = { prefix: 'fab', iconName: 'github' };
  const githubIconDef: IconDefinition = findIconDefinition(githubIcon);

  return (
    <footer className='solid-footer footer'>
      <section className='solid-footer__content'>
        <div className='solid-footer__content--copyright'>
          <ul>
            <li>© {process.env.REACT_APP_COMPANY_NAME}</li>
            <li>Build <span className='build-value'>{process.env.REACT_APP_VERSION}</span></li>
          </ul>
        </div>

        <div className='solid-footer__content--links'>
          <ul>
            <li><a href='https://github.com/Inrupt-inc/solid-react-sdk' target='_blank'>
              <FontAwesomeIcon className='link-icon' icon={githubIconDef}/>react-solid-sdk</a>
            </li>
            <li><a href='https://github.com/Inrupt-inc/solid-style-guide' target='_blank'>
              <FontAwesomeIcon className='link-icon' icon={githubIconDef}/>solid-style-guide</a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
