import React, { Fragment, Suspense } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { ToasterNotification, Loader } from '@util-components';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Routes from './routes';
import theme from './utils/theme';
import 'flag-icon-css/css/flag-icon.min.css';
import 'normalize.css';
import './index.css';
import '@inrupt/solid-style-guide';

library.add(fas);
library.add(faGithub);
const App = () => (
  <Suspense fallback={<Loader />}>
    <ThemeProvider theme={theme}>
      <ToastProvider
        components={{ Toast: ToasterNotification }}
        placement="top-center"
        autoDismissTimeout={3000}
        autoDismiss
      >
        <Fragment>
          <Routes />
        </Fragment>
      </ToastProvider>
    </ThemeProvider>
  </Suspense>
);

export default App;
