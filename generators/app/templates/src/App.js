import React, { Fragment, Suspense } from 'react';
import { toast, Slide } from 'react-toastify';
import { Loader } from '@util-components';
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Routes from './routes';
import theme from './utils/theme';
import 'react-toastify/dist/ReactToastify.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'normalize.css';
import './index.css';
import '@inrupt/solid-style-guide';
import { Toaster } from './App.styled';

library.add(fas);
library.add(faGithub);
const App = () => (
  <Suspense fallback={<Loader />}>
    <ThemeProvider theme={theme}>
      <Fragment>
        <Routes />
        <Toaster
          {...{
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
            newestOnTop: true,
            closeOnClick: true,
            pauseOnVisibilityChange: true,
            draggable: true,
            className: 'solid-toaster-container',
            toastClassName: 'solid-toaster',
            bodyClassName: 'solid-toaster-body',
            transition: Slide
          }}
        />
      </Fragment>
    </ThemeProvider>
  </Suspense>
);

export default App;
