import React from "react";
import {
  GlobalErrorWrapper,
  ErrorTitle,
  ErrorInfo
} from "./global-error.style";

type Props = {
  error: String,
  info: Object
};
/**
 * Global Component to show error on app
 * has basic markup and will render into ErrorBoundary component
*/
export const GlobalError = ({ error, info }: Props) => {
  return (
    <GlobalErrorWrapper>
      <ErrorTitle>{error}</ErrorTitle>
      <ErrorInfo>{info.componentStack}</ErrorInfo>
    </GlobalErrorWrapper>
  );
};
