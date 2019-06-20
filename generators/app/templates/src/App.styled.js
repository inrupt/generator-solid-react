import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const Toaster = styled(ToastContainer)`
  &.solid-toaster-container {
    min-width: 410px;
    margin-left: 0;
    transform: translateX(-50%);
    padding: 0;
    & .toaster-error {
      color: #fff;
      background: rgba(213, 0, 0, 0.9);
    }

    & .toaster-success {
      color: #fff;
      background: rgba(124, 77, 255, 0.9);
    }
  }

  & .solid-toaster {
    border-radius: 4px;
    min-width: 410px;
    color: #fff;
    display: flex;
    align-content: center;
    min-height: 72px;
    margin: 0;

    & > .solid-toaster-body {
      margin: 0;
      display: flex;
    }

    & > button {
      color: #fff;
      opacity: 0.8;
    }
  }
`;
